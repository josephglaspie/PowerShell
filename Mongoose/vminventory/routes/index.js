var express = require('express');
var async = require('async');
var router = express.Router();
var vminventoryCtrl = require('../controllers/vminventory.server.controller');

/* GET home page. */
router.get('/', function(req, res) {
    return vminventoryCtrl.list(req, res);
});

/* POST filter by member name - home page. */
router.post('/', function(req, res) {
    return vminventoryCtrl.filterByMember(req, res);
});

/* GET New Note page. */
router.get('/newnote', function(req, res) {
    return vminventoryCtrl.getNote(req, res);
});

/* POST New Note page. */
router.post('/newnote', function(req, res) {
    return vminventoryCtrl.create(req, res);
});

/*
router.post('/newnote', function(req, res) {

    async.mapSeries(req.body, function iterator(item, cb) {

            var vminventory = new vminventory(item);
            vminventory.save(function(error) {
                cb(error, vminventory);
            });
        },
        function done(error, vminventoryCtrls) {
            res.json(error ? { message: "could not create vminventoryCtrl because " + error } : vminventoryCtrls);
        });
});
*/

module.exports = router;