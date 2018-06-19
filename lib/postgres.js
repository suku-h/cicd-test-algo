"use strict";

let pg = require('postgreslib');

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