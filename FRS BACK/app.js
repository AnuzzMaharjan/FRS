const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const users = require('./routes/userInfo');
const items = require('./routes/listItems');

app.use('/', users);
app.use('/', items);

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})