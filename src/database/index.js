const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postapi',
    password: 'root',
    port: 5432,
});  

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}