const express = require('express');
const path = require('path'); // Add this line

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../client/dist'))); // Updated this line

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Fallback route to send the index.html file for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html')); // Ensure this path is correct
});

// Import your routes if needed
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));