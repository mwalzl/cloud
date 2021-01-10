'use strict';
'use strict';



const https = require('https')

// get request
const options = {
    hostname: 'peaceful-spire-97866.herokuapp.com',
    port: 443,
    path: '/snippets',
    method: 'GET'
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    var express = require("express");
    var app = express();
    app.use(express.logger());

    app.get('/', function(request, response) {
        response.send('Hello World!');
        console.log("hello roland");
    });

    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        console.log("Listening on " + port);
    });

    var pg = require('pg');

    var connectionString = "postgres://snippet:keines@postgresql.myproject.svc.cluster.local:5432/snippet"

    pg.connect(connectionString, function(err, client, done) {
        client.query('SELECT * FROM snippets', function(err, result) {
            done();
            if(err) return console.error(err);
            console.log(result.rows);
        });
    })
    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.end()


const data = JSON.stringify({
    todo: ''
})

const options = {
    hostname: 'peaceful-spire-97866.herokuapp.com',
    port: 443,
    path: '/snippets',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.write(data)
req.end()