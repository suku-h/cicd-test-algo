"use strict";

let pg = require('b2x-postgres');

module.exports = {
    init: async (dbConfig) => {
        try {
            await pg.__init(dbConfig);
            return pg;
        } catch(err) {
            throw err;
        }
    }
}