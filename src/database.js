const Loki = require("lokijs");
const Unternehmen = require('./Unternehmen');
const Bewertung = require('./Bewertung');

const db = new Loki('demo.json');

const unternehmen = db.addCollection('unternehmen');
const bewertung = db.addCollection('bewertung');

// Unternehmen
let zuckerl = new Unternehmen("Zuckerl-Zenzi", "Sauerstraße 12", "8765 Bitter");
let burger = new Unternehmen("Burger-Berti", "Fettplatz 3a", "8123 Dicken");
let rosen  = new Unternehmen("Rosen-Rudi", "Grünweg 7", "8456 Kahlschlag");
let kleider = new Unternehmen("Kleider-Kathi", "Rockplatz 3", "8312 Nackig");

unternehmen.insert(zuckerl);
unternehmen.insert(burger);
unternehmen.insert(rosen);
unternehmen.insert(kleider);

// Bewertungen
bewertung.insert(new Bewertung(zuckerl, "So süß, zum hineinlegen.", 97.5));
bewertung.insert(new Bewertung(burger, "Da weiß man, was man nicht hat.", 63.2));
bewertung.insert(new Bewertung(rosen, "Der Rudi bringt's.", 76.8));
bewertung.insert(new Bewertung(kleider, "Könnte flippiger sein.", 73.3));

module.exports = db;