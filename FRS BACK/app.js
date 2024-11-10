const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

const app = express();

const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5173', // Frontend origin
    credentials: true, // Enable credentials
}));
app.use(express.json());


const users = require('./routes/userInfo');
const items = require('./routes/listItems');
const caterinPkg = require('./routes/cateringList');

app.use('/', users);
app.use('/', items);
app.use('/', caterinPkg);

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})