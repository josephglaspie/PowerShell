var cfg = {
    client: "sqlite3",
    connection: {
        filename: "./book.sqlite"
    },
    useNullAsDefault: true
};

var knex = require("knex")(cfg);
knex.destroy();
console.log("Done.");