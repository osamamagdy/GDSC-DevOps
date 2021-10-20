const express = require('express');
const redis = require('redis');
const app = express();

const client = redis.createClient();

client.set('visits', 0);


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



var app_port = app.listen(process.env.PORT || 8080);


app.listen(app_port,()=>{
    console.log("Listening on port 8080");
});


app.get('/',(req,res)=>{
    //This will be executed with every request to the node server
    client.get('visits', (err, visits)=>{
        client.set('visits', parseInt(visits)+1);
        res.render('home', {  style:"home"  , visits: visits});
        //Increase the number of visitors by 1
    });
});
