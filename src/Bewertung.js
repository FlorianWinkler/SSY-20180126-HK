class Bewertung {
    constructor(unternehmen, beschreibung, bewertung) {
        this.unternehmen = unternehmen;
        this.beschreibung = beschreibung;
        this.bewertung = bewertung;
    }

    /**
     * Wir haben eine eigene Funktion, die beim Serialisieren als JSON
     * für das Unternehmen eine Referenz retourniert (nur ID, nicht volle URL).
     */
    toJSON() {
        let bewertung = Object.assign({}, this);    // copy/clone
        bewertung.meta = undefined;
        bewertung.unternehmen = this.unternehmen.$loki;
        return bewertung;
    }
}

module.exports = Bewertung;
