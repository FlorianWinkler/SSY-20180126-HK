const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SSY Hauptklausur 2018-01-26' });
});

module.exports = router;
