
//port in enviornment variable
const express = require('express');
const cors = require('cors');
var noteRoute = require('./Router/noteRoute');
const app = express();

// Configuration options for cors middleware
// const corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200,
// };

// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route to handle POST requests
app.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('Data received');
});

// Route to handle GET requests to /api/data
app.get('/', (req, res) => {
    // Send some data as a response
    res.send('Express hello received');
});

app.use("/api/v1", noteRoute)
// Start server
app.listen(80, () => {
    console.log('Server started on port 3000');
});