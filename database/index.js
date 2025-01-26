const { Pool } = require("pg");
require("dotenv").config();

// SSL configuration for production (Render PostgreSQL)
let pool;

if (process.env.NODE_ENV === "production") {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // Required for Render's PostgreSQL
        },
    });
} else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // Allow self-signed certificates in local dev
        },
    });
}

module.exports = {
    async query(text, params) {
        try {
            const res = await pool.query(text, params);
            console.log("executed query", { text });
            return res;
        } catch (error) {
            console.error("error in query", { text });
            throw error;
        }
    },
};
