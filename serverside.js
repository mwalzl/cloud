'use strict';

app.get('/getdata', function(request, response) {
    client.query("SELECT time, name, assembly FROM timings order by time limit 10", function(err, results) {
        if (err) {
            throw err;
        }
        response.send(results.rows); // assumes 'results.rows' can be serialized to JSON
    });
});