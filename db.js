const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "0170744",
  host: "localhost",
  port: 5432,
  database: "todo_app",
});
module.exports = pool;
