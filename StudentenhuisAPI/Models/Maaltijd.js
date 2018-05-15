

const assert = require("assert");
const ApiError = require("../ApiError");


class Maaltijd {

    constructor(naam, beschrijving, ingredienten, allergie, prijs){
        try {

            assert(typeof (naam) === "string", "name must be a string");
            assert(typeof (beschrijving) === 'string', "beschrijving must be a string");
            assert(typeof (ingredienten) === "string", "ingredienten must be a string");
            assert(typeof (allergie) === "string", "allergie must be a string");
            assert(typeof (prijs) === "number", "prijs must be a number");

            assert(naam.trim().length > 2, "Name must be at least 3 characters long");
            assert(beschrijving.trim().length > 4, "Beschrijving must be at least 5 characters");
            assert(ingredienten.trim().length > 4, "ingredienten must be at least 5 characters long");
            assert(allergie.trim().length > 2, "allergie must be at least 3 characters long");
            assert(prijs >= 1, "Prijs must be 1 or bigger");

        } catch (ex){
            throw(new ApiError(ex.toString(), 422));
        }
        this.naam = naam;
        this.beschrijving = beschrijving;
        this.ingredienten = ingredienten;
        this.allergie = allergie;
        this.prijs = prijs;
    }
}

module.exports = Maaltijd;