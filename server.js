const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('This is the API and it. Is. RUNNING!!'));

const PORT = process.env.PORT || 5000

app.listen( PORT, () => console.log(`Server started on ${PORT}`));

