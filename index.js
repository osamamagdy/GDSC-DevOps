const express = require('express');
const redis = require('redis');
const app = express();

const client = redis.createClient();

client.set('visits', 0);


app.get('/',(req,res)=>{
    //This will be executed with every request to the node server
    client.get('visits', (err, visits)=>{
        res.send('Number of visits is ' + visits);
        client.set('visits', parseInt(visits)+1);
        //Increase the number of visitors by 1
    })
});

app.listen(8080,()=>{
    console.log("Listening on port 8080");
});
