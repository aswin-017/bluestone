const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/users', authRoutes);
app.use('/api', enquiryRoutes);
app.use('/api/admin', adminRoutes);
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
