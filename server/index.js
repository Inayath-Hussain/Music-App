const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()


const authorize = require('./routes/authorize');
const token = require('./routes/token');
const refresh = require('./routes/refresh');


app.use(cors())
app.use(express.json())

let a = 0;

app.use('/authorize', authorize);

app.use('/token', token);

app.use('/refresh', refresh)

app.listen(3001, () => console.log('port 3001...'));