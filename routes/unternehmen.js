/*
Hinweis:

Die Tests 1-5 in src/tests.js zeigen Ihnen die gewünschte Request- und Response-Struktur.
Die JSON-Struktur entspricht unserem Standard-Vorgehen.
*/
const express = require('express');
const database = require('../src/database');
const Unternehmen = require('../src/Unternehmen');
const router = express.Router();


router.get('/', function(req, res){
    let uCollection = database.getCollection('unternehmen');
    let result = [];
    for (let u of uCollection.find()){
        result.push(u);
    }
    res.json(result);
});

router.get('/:id', function(req, res){
    res.json(database.getCollection('unternehmen').get(req.params.id));
});

router.post('/',function (req,res) {
    let coll = database.getCollection('unternehmen');
    let newItem = new Unternehmen(
        req.body.name,
        req.body.strasse,
        req.body.ort
    );
    let responseJson=coll.insert(newItem);
    //console.log('New Unternehmen:');
    //console.log(responseJson);
    res.json(responseJson);
});

router.delete('/:id', function(req,res){

   let id = req.params.id;
   let coll = database.getCollection('unternehmen');
   let delItem = coll.get(id);
   console.log('Delete:');
   console.log(delItem);
   coll.remove(delItem);
   console.log(coll.find());
   res.json(delItem);
});

router.patch('/:id',function (req,res) {
    let id = req.params.id;
    let coll = database.getCollection('unternehmen');
    let newItem = coll.get(id);
    newItem.strasse = req.body.strasse;
    newItem.ort = req.body.ort;
    coll.update(newItem);
    //console.log('Unternehmen Update: ');
    //console.log(newItem);
    res.json(newItem);
});


module.exports = router;
