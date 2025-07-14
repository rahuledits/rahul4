const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactRoute = require('./api/contact.cjs');

const app = express();
app.use(cors()); // Allow all origins for local dev, restrict in prod!
app.use(bodyParser.json());

app.use('/api/contact', contactRoute);

const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`)); 