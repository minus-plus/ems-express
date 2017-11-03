let express = require('express');
let router = express.Router();
let request = require('request-promise');
let $ = require('cheerio');
/* GET users listing. */
router.get('/ems/:trackingNumber', function(req, res, next) {
    let trackingNumber = req.params.trackingNumber;
    let options = {
        method: 'GET',
        uri: `http://www.kuaidi100.com/query?type=ems&postid=${trackingNumber}`
    };

    request(options)
        .then(function(data) {
            res.send(data);
        })
        .catch(function(err) {
            console.log("err");
            res.send({"error": true});
        });

});
router.get('/whale/:trackingNumber', function(req, res, next) {
    let trackingNumber = req.params.trackingNumber;
    let options = {
        method: 'GET',
        uri: `http://www.whalexp.com/select/?num=${trackingNumber}`
    };

    request(options)
        .then(function(body) {
            const table = $(body).find('table');
            let data = parseTable(table);
            res.send(data);
        })
        .catch(function(err) {
            res.send({"error": true});
        });
});

function parseTable(table)  {
    let data = {};
    let items = [];
    let rows = $(table).find('tr');
    let len = rows.length;
    if (len === 0) {
        return [];
    } else {
        for (let i = 0; i < len; i++) {
            let r = rows[i];
            let tds = $(r).find('td');
            let len = tds.length;
            if (len === 2) {
                let t = $(tds[0]).text();
                let ctx = $(tds[1]).text();
                items.push({
                    time: $(tds[0]).text(),
                    context: $(tds[1]).text()
                })
            } else if (len === 1){
                let context = $(tds[0]).text();
                if (context.length > 0) {
                    items.push({
                        time: '',
                        context: $(tds[0]).text()
                    })
                }
                let tracking = context.match(/EK\d+HK/i);
                if (tracking) {
                    data['tracking'] = tracking[0];
                }
            }
        }
    }
    data['items'] = items;
    return data;
}


module.exports = router;
