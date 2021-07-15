const express = require('express');
// NOTE: Body-Parser is now included with Express!
const connectDB = require('./Config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// New way!
app.use(express.json({ extended: false }));

// Old way!
// app.use(bodyParser.json())

app.get('/', (req, res) => res.send('This is the API and it. Is. RUNNING!!'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 3001;

app.listen( PORT, () => console.log(`Server started on ${PORT}`));

