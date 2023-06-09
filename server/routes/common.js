var express = require('express');
var router = express.Router();
var {common} = require('../models/common')

router.post('/save', function (req, res) {
  common[req.body.function_name](req.body, function (err, result) {
    if (err) {
      res.json({ success: false, err })
    } else {
      res.json({ success: true, result })
    }
  });
});

router.put('/update', function (req, res) {
  common[req.body.function_name](req.body, function (err, result) {
    if (err) {
      res.json({ success: false, err })
    } else {
      res.json({ success: true, result })
    }
  });
});

router.get('/getFunction/:function_name/:p1?/:p2?/:p3?/:p4?/:p5?', function (req, res) {
  common[req.params.function_name](req.params, function (err, result) {
    console.log(err,result)
    if (err) {
      res.json({ success: false, err })
    } else {
      res.json({ success: true, result })
    }
  });
});

router.delete('/deleteFunction/:function_name/:p1', function (req, res) {
  common[req.params.function_name](req.params, function (err, result) {
    if (err) {
      res.json({ success: false, err })
    } else {
      res.json({ success: true, result })
    }
  });
});

module.exports = router
