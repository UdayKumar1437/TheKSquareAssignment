const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./utils');
const users = require('./db.json').users;
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Log the total number of users
console.log('Total users:', users.length);

// Routes
app.use('/', require('./routes/getUsers'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
