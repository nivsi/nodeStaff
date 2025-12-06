const express = require('express');
const pg = require('pg');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());

const client = new pg.Client(process.env.DATABASE_URL);

app.get('/users', async (req, res) => {

    try {
        const connection = await client.connect();

        await client.query('BEGIN');
        const users = await client.query('SELECT * FROM users');
        await client.query('COMMIT');
    }
    catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
    }

})


app.listen(3000, () => {
    console.log(`Server running on port 3000!`);
});