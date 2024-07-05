const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Use the user routes
app.use('/api/users', userRoutes);

// The "catchall" handler: for any request that doesn't match the above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
