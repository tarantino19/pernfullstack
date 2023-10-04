const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: undefined,
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

//table is called todo

module.exports = pool;
