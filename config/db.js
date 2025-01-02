require('dotenv').config();
const { Pool } = require('pg');

function configDb() {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
    // Test the connection
    // pool.query('SELECT NOW()', (err, res) => {
    // if (err) {
    //     console.error('Error connecting to PostgreSQL:', err);
    // } else {
    //     console.log('Connected to PostgreSQL:', res.rows[0].now);
    // }
    
    // });
    return pool;
}
module.exports = {configDb};
