/*
Hinweis 1:

Für die Implementierung ist es notwendig, Variablen über Request-Grenzen
hinweg weiterzureichen. Allerdings kann bei der Response-Funktion kein
Parameter mitübergeben werden. Die Lösung ist die Funktionen ineinander
zu verschachteln:

function func1(param1) {
    let var1 = 1;
    func2();    // ohne Parameter

    function func2() {  // verschachtelt
        let var2 = 2;
        func3();    // ohne Parameter

        function func3() {  // weiter verschachtelt
            // hier Zugriff auf alle Variable möglich
            console.log(param1, var1, var2);
            // Achtung: Falls func1, func2 oder func3 gleiche Parameternamen haben
            //          dann wird letzte Definition verwendet -->
            //          verwenden Sie unterschiedliche Namen in allen Funktionen
        }
    }
}

Hinweis 2:

Test 14 kann fehlschlagen, obwohl Sie die Funktion richtig implementiert haben.
Z.B. wenn Sie die Objekte in einer anderen Reihenfolge retournieren.

Achten Sie aber darauf, dass nur _3_ Einträge retourniert werden:
Nur Unternehmen mit Bewertungen (und vice-versa) sollen retourniert werden.
*/
const Request = require('request');
const express = require('express');
const router = express.Router();

router.get('/:id', getBeides);
router.post('/', postBeides);
router.delete('/:id', deleteBeides);
router.get('/', getBeidesAll);

function getBeides(req,res){
    let bewertungId = req.params.id;
    Request.get({
        url: 'http://127.0.0.1:3000/bewertungen/' + bewertungId,
        json: true
    }, handleBewertungResponse);

    function handleBewertungResponse(error, response, body){
        let bewertung = body;
        //console.log('Bewertung');
        //console.log(bewertung);
        Request.get({
            url: 'http://127.0.0.1:3000/unternehmen/'+bewertung.unternehmen,
            json:true
        },handleUnternehmenResponse);

        function handleUnternehmenResponse(error, response, body){
            let unternehmen = body;
            //console.log('Unternehmen'+unternehmen);
            let responseObj = {
                id: bewertungId,
                unternehmen: unternehmen.name,
                strasse: unternehmen.strasse,
                ort: unternehmen.ort,
                beschreibung: bewertung.beschreibung,
                bewertung: bewertung.bewertung
            };
            //console.log(responseObj);
            res.json(responseObj);
        }
    }
}

function postBeides(req,res){
    Request.post({
        url: 'http://127.0.0.1:3000/unternehmen',
        json: {
            name: req.body.name,
            strasse: req.body.strasse,
            ort: req.body.ort
        }
    },handleUnternehmenResponse);

    function handleUnternehmenResponse(error, response, body) {
        Request.post({
            url: 'http://127.0.0.1:3000/bewertungen/',
            json:{
                unternehmen: body.$loki,
                beschreibung: req.body.beschreibung,
                bewertung: req.body.bewertung
            }
        }, handleBewertungenResponse);

        function handleBewertungenResponse(error, response, body) {
            res.json({
                id: body.$loki,
                unternehmen: req.body.name,
                strasse: req.body.strasse,
                ort: req.body.ort,
                unternhemen: req.body.unternehmen,
                beschreibung: req.body.beschreibung,
                bewertung: req.body.bewertung
            });
        }
    }
}

function deleteBeides(req,res){
    let responseItem={};
    Request.delete({
        url: 'http://127.0.0.1:3000/bewertungen/'+req.params.id,
        json: true
    },handleResponseBewertung);

    function handleResponseBewertung(error,response,body) {
        responseItem.beschreibung=body.beschreibung;
        responseItem.bewertung=body.bewertung;
        Request.delete({
            url: 'http://127.0.0.1:3000/unternehmen/'+body.unternehmen,
            json: true
        }, handleResponseUnternehmen);

        function handleResponseUnternehmen(error,response,body) {
            responseItem.unternehmen=body.name;
            responseItem.strasse=body.strasse;
            responseItem.ort=body.ort;
            res.json(responseItem);
        }
    }
}

function getBeidesAll(req,res){
    let bewertungIds =[];
    Request.get({
        url: 'http://127.0.0.1:3000/bewertungen',
        json: true
    }, handleGetBewertungen);

    function handleGetBewertungen(error,response,body) {
        for(let b of body){
            bewertungIds.push(b.$loki);
        }
        //console.log(bewertungIds);
        //console.log(bewertungIds[0]);
        let i=0;
        Request.get({
            url: 'http://127.0.0.1:3000/beides/'+bewertungIds[i++],
            json: true
        }, handleGetBeides);

        let responseItem=[];
        function handleGetBeides(error,response,body) {
            responseItem.push(body);

            if(bewertungIds[i] !== undefined){
                Request.get({
                    url: 'http://127.0.0.1:3000/beides/'+bewertungIds[i++],
                    json: true
                }, handleGetBeides);
            }
            else{
                res.json(responseItem);
            }
        }

    }

}


module.exports=router;
