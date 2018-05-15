const assert = require("assert");
const ApiError = require("../ApiError");


class Studentenhuis {

    constructor(naam, adres){
        try {

            assert(typeof (naam) === "string", "name must be a string");
            assert(typeof (adres) === 'string', "adres must be a string");
            assert(naam.trim().length > 4, "Name must be at least 4 characters long");
            assert(adres.trim().length > 4, "Adres must be at least 4 characters");

        } catch (ex){
            throw(new ApiError(ex.toString(), 422));
        }
        this.naam = naam;
        this.adres = adres;
    }
}

module.exports = Studentenhuis;