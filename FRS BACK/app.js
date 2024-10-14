const express = require('express');
const cors = require('cors');

const app = express();

const port = 4000;

app.use(cors());
app.use(express.json());

const users = require('./routes/userInfo');
const items = require('./routes/listItems');

app.use('/', users);
app.use('/', items);

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})