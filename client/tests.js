const Request = require('request');

// Achtung: Tests funktionieren nur zu 100%, wenn Server neu gestartet wurde

let score = 0;

test1Request();


///// Unternehmen //////////////////////////////////////////////////////

function test1Request() {
    Request.get({
        url: 'http://localhost:3000/unternehmen/',
        json: true
    }, test1Response);
}

function test1Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 1: Funktion nicht implementiert.");
        else if (error === null &&
            body[0].name === 'Zuckerl-Zenzi' &&
            body[1].strasse === 'Fettplatz 3a' &&
            body[2].ort === '8456 Kahlschlag' &&
            body[3].name === 'Kleider-Kathi') {
            console.log("Test 1 funktioniert.");
            score += 5;
        }
        else
            console.log("Test 1 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 1 schlägt fehl");
    }

    test2Request();
}

function test2Request() {
    Request.get({
        url: 'http://localhost:3000/unternehmen/1',
        json: true
    }, test2Response);
}

function test2Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 2: Funktion nicht implementiert.");
        else if (error === null &&
            body.name === 'Zuckerl-Zenzi' &&
            body.strasse === 'Sauerstraße 12' &&
            body.ort === '8765 Bitter') {
            console.log("Test 2 funktioniert.");
            score += 5;
        }
        else
            console.log("Test 2 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 2 schlägt fehl");
    }

    test3Request();
}


function test3Request() {
    Request.post({
        url: 'http://localhost:3000/unternehmen/',
        json: {
            name: "Foto-Frida",
            strasse: "Blitzerplatz 1",
            ort: "8234 Glanz",
    }}, test3Response);
}

function test3Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 3: Funktion nicht implementiert.");
        else if (error === null &&
            body.name === 'Foto-Frida' &&
            body.strasse === 'Blitzerplatz 1' &&
            body.ort === '8234 Glanz' &&
            body.$loki > 1) {
            console.log("Test 3 funktioniert.");
            score += 7;
        }
        else
            console.log("Test 3 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 3 schlägt fehl");
    }

    test4Request();
}


function test4Request() {
    Request.delete({
        url: 'http://localhost:3000/unternehmen/1',
        json: true
    }, test4Response);
}

function test4Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 4: Funktion nicht implementiert.");
        else if (error === null &&
            body.name === 'Zuckerl-Zenzi' &&
            body.strasse === 'Sauerstraße 12' &&
            body.ort === '8765 Bitter' &&
            typeof body.$loki === 'undefined') {
            console.log("Test 4 funktioniert.");
            score += 5;
        }
        else
            console.log("Test 4 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 4 schlägt fehl");
    }

    test5Request();
}


function test5Request() {
    Request.patch({
        url: 'http://localhost:3000/unternehmen/2',
        json: {
            strasse: "Körndlgasse 3b",
            ort: "8654 Vegan"
        }
    }, test5Response);
}

function test5Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 5: Funktion nicht implementiert.");
        else if (error === null &&
            body.name === 'Burger-Berti' &&
            body.strasse === 'Körndlgasse 3b' &&
            body.ort === '8654 Vegan' &&
            body.$loki === 2) {
            console.log("Test 5 funktioniert.");
            score += 7;
        }
        else
            console.log("Test 5 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 5 schlägt fehl");
    }

    test6Request();
}



///// Bewertungen //////////////////////////////////////////////////////


function test6Request() {
    Request.get({
        url: 'http://localhost:3000/bewertungen/',
        json: true
    }, test6Response);
}

function test6Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 6: Funktion nicht implementiert.");
        else if (error === null &&
            body[0].bewertung === 97.5 &&
            body[1].beschreibung === 'Da weiß man, was man nicht hat.' &&
            body[2].unternehmen === 3 &&
            body[3].beschreibung === 'Könnte flippiger sein.') {
            console.log("Test 6 funktioniert.");
            score += 2;
        }
        else
            console.log("Test 6 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 6 schlägt fehl");
    }

    test7Request();
}

function test7Request() {
    Request.get({
        url: 'http://localhost:3000/bewertungen/2',
        json: true
    }, test7Response);
}

function test7Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 7: Funktion nicht implementiert.");
        else if (error === null &&
            body.unternehmen === 2 &&
            body.beschreibung === 'Da weiß man, was man nicht hat.' &&
            body.bewertung === 63.2) {
            console.log("Test 7 funktioniert.");
            score += 2;
        }
        else
            console.log("Test 7 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 7 schlägt fehl");
    }

    test8Request();
}


function test8Request() {
    Request.post({
        url: 'http://localhost:3000/bewertungen/',
        json: {
            unternehmen: 2,
            beschreibung: "Also mir schmeckt's. Mehr Pommes!",
            bewertung: 88.5
        }}, test8Response);
}

function test8Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 8: Funktion nicht implementiert.");
        else if (error === null &&
            body.unternehmen === 2 &&
            body.beschreibung === "Also mir schmeckt's. Mehr Pommes!" &&
            body.bewertung === 88.5 &&
            body.$loki > 1) {
            console.log("Test 8 funktioniert.");
            score += 9;
        }
        else
            console.log("Test 8 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 8 schlägt fehl");
    }

    test9Request();
}


function test9Request() {
    Request.delete({
        url: 'http://localhost:3000/bewertungen/3',
        json: true
    }, test9Response);
}

function test9Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 9: Funktion nicht implementiert.");
        else if (error === null &&
            body.unternehmen === 3 &&
            body.beschreibung === "Der Rudi bringt's." &&
            body.bewertung === 76.8 &&
            typeof body.$loki === 'undefined') {
            console.log("Test 9 funktioniert.");
            score += 2;
        }
        else
            console.log("Test 9 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 9 schlägt fehl");
    }

    test10Request();
}


function test10Request() {
    Request.patch({
        url: 'http://localhost:3000/bewertungen/2',
        json: {
            beschreibung: "Eigentlich doch ganz gut - so nach drei Stunden...",
            bewertung: 77.1
        }
    }, test10Response);
}

function test10Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 10: Funktion nicht implementiert.");
        else if (error === null &&
            body.unternehmen === 2 &&
            body.beschreibung === "Eigentlich doch ganz gut - so nach drei Stunden..." &&
            body.bewertung === 77.1 &&
            body.$loki === 2) {
            console.log("Test 10 funktioniert.");
            score += 2;
        }
        else
            console.log("Test 10 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 10 schlägt fehl");
    }

    test11Request();
}


///// Beides //////////////////////////////////////////////////////


function test11Request() {
    Request.get({
        url: 'http://localhost:3000/beides/4',
        json: true
    }, test11Response);
}

function test11Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 11: Funktion nicht implementiert.");
        else if (error === null &&
            body.id == 4 &&
            body.unternehmen === "Kleider-Kathi" &&
            body.strasse === 'Rockplatz 3' &&
            body.ort === '8312 Nackig' &&
            body.beschreibung === "Könnte flippiger sein." &&
            body.bewertung === 73.3 &&
            typeof body.$loki === 'undefined') {
            console.log("Test 11 funktioniert.");
            score += 15;
        }
        else
            console.log("Test 11 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 11 schlägt fehl");
    }

    test12Request();
}


function test12Request() {
    Request.post({
        url: 'http://localhost:3000/beides/',
        json: {
            name: "Foto-Frida",
            strasse: "Blitzerplatz 1",
            ort: "8234 Glanz",
            beschreibung: "Macht tolle Schnappschüsse!",
            bewertung: 89.4
        }
    }, test12Response);
}

function test12Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 12: Funktion nicht implementiert.");
        else if (error === null &&
            body.id > 4 &&
            body.unternehmen === "Foto-Frida" &&
            body.strasse === 'Blitzerplatz 1' &&
            body.ort === '8234 Glanz' &&
            body.beschreibung === "Macht tolle Schnappschüsse!" &&
            body.bewertung === 89.4 &&
            typeof body.$loki === 'undefined') {
            console.log("Test 12 funktioniert.");
            score += 15;
        }
        else
            console.log("Test 12 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 12 schlägt fehl");
    }

    test13Request();
}


function test13Request() {
    Request.delete({
        url: 'http://localhost:3000/beides/4',
        json: true
    }, test13Response);
}

function test13Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 13: Funktion nicht implementiert.");
        else if (error === null &&
            body.unternehmen === "Kleider-Kathi" &&
            body.strasse === 'Rockplatz 3' &&
            body.ort === '8312 Nackig' &&
            body.beschreibung === "Könnte flippiger sein." &&
            body.bewertung === 73.3 &&
            typeof body.id === 'undefined' &&
            typeof body.$loki === 'undefined') {
            console.log("Test 13 funktioniert.");
            score += 14;
        }
        else
            console.log("Test 13 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 13 schlägt fehl");
    }

    test14Request();
}


function test14Request() {
    Request.get({
        url: 'http://localhost:3000/beides/',
        json: true
    }, test14Response);
}

function test14Response(error, response, body) {
    try {
        if (response.statusCode === 404)
            console.log("Test 14: Funktion nicht implementiert.");
        else if (error === null &&
            body.length === 3 &&
            body[0].id === 2 &&
            body[0].ort === '8654 Vegan' &&
            body[0].beschreibung === "Eigentlich doch ganz gut - so nach drei Stunden..." &&
            body[1].id === 5 &&
            body[1].strasse === "Körndlgasse 3b" &&
            body[1].bewertung === 88.5 &&
            body[2].unternehmen === "Foto-Frida" &&
            body[2].beschreibung === "Macht tolle Schnappschüsse!") {
            console.log("Test 14 funktioniert.");
            score += 10;
        }
        else
            console.log("Test 14 liefert falsches Ergebnis: "+JSON.stringify(body));
    }
    catch(e) {
        console.log("Test 14 schlägt fehl");
    }

    console.log("Punktezahl: "+score+" von 100");
}
