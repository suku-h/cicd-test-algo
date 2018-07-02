var http = require("https");
var pool = new http.Agent();
pool.maxSockets = 5;
module.exports = {
    postgreLogger: function(singleJson = null) {
        var options = {
            "method": "POST",
            "hostname": 'chronicles.b2x.com',
            "port": null,
            "path": '/log-viewer/api/loggerToken',
            "headers": {
                'content-type': 'application/json',
                'cache-control': 'no-cache',
                'authtoken': "5b39c7002b93b359bdb754ec"
            },
            'agent': pool
        };
        var req = http.request(options, function(res) {
            var chunks = [];
            res.on("data", function(chunk) {
                chunks.push(chunk);
            });
            res.on("end", function() {
                try {
                    var body = JSON.parse(Buffer.concat(chunks))
                  } catch (err) {
                    body = {status: 'fail'}
                  }
                if (body.status == 'fail') {
                    console.log("Error while sending logs -->", body);
                }
            });
        });
        req.on('error', (e) => {
            console.error('problem with request:',e.message);
        });
        req.write(JSON.stringify(singleJson));
        req.end();
        return 1;
    }
}
