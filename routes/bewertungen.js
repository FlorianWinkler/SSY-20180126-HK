/*
Hinweis:

Die Tests 6-10 in src/tests.js zeigen Ihnen die gewünschte Request- und Response-Struktur.
Die JSON-Struktur entspricht unserem Standard-Vorgehen.
*/
const express=require('express');
const router = express.Router();
const Bewertung = require('../src/Bewertung');
const database = require('../src/database');

router.get('/',function(req,res){
   res.json(database.getCollection('bewertung').find());
});

router.get('/:id', function (req,res){
   res.json(database.getCollection('bewertung').get(req.params.id));
});

router.post('/',function (req,res) {
   let newItem = new Bewertung(
        req.body.unternehmen,
        req.body.beschreibung,
        req.body.bewertung
   );
   res.json(database.getCollection('bewertung').insert(req.body));
});

router.delete('/:id',function (req,res) {
   let coll = database.getCollection('bewertung');
   let delItem = coll.get(req.params.id);
   coll.remove(delItem);
   res.json(delItem);
});

router.patch('/:id',function (req,res) {
    let id = req.params.id;
    let coll = database.getCollection('bewertung');
    let newItem = coll.get(id);
    newItem.beschreibung = req.body.beschreibung;
    newItem.bewertung = req.body.bewertung;
    coll.update(newItem);
    console.log('Bewertung Update:');
    console.log(newItem);
    res.json(newItem);
});

module.exports=router;
