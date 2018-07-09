const PGLINK = require('./pg');


module.exports = {
  development : {
    client: 'pg',
    connection: PGLINK || process.env.DATABASE_URL
  },  
  test: {},
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
