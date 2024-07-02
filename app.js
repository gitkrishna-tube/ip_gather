const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const requestIp = require('request-ip');

const app = express();

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Use request-ip middleware to get the client's IP address
app.use(requestIp.mw());

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit-name', (req, res) => {
    const name = req.body.name;
    const ip = req.clientIp;
    console.log(`Visitor's IP Address: ${ip}`);
    console.log(`Visitor's Name: ${name}`);

    res.send(`Thank you, ${name}`);
});

const port = 6111;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
