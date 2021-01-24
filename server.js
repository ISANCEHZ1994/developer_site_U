const express = require('express');
const connectDB = require('./Config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('This is the API and it. Is. RUNNING!!'));

const PORT = process.env.PORT || 3001;

app.listen( PORT, () => console.log(`Server started on ${PORT}`));

