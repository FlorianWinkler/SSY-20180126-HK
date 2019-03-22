class Unternehmen {
    constructor(name, strasse, ort) {
        this.name = name;
        this.strasse = strasse;
        this.ort = ort;
    }

    /**
     * Wir haben eine eigene Funktion, die beim Serialisieren als JSON
     * die DB-Meta-Daten weglässt
     */
    toJSON() {
        let unternehmen = Object.assign({}, this);    // copy/clone
        unternehmen.meta = undefined;
        return unternehmen;
    }
}

module.exports = Unternehmen;