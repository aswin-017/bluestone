const db = require('../config/db');

exports.submitEnquiry = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    nationality,
    dateOfBirth,
    educationLevel,
    intendedCourse,
    targetCountry,
    additionalInfo,
    linkedInProfile,
    preferredStartDate,
    budget,
    termsAccepted,
  } = req.body;

  const userId = req.user.id; // Assuming req.user is set by a middleware after token verification

  const sql = 'INSERT INTO enquiries (user_id, first_name, last_name, email, password, gender, nationality, date_of_birth, education_level, intended_course, target_country, additional_info, linkedin_profile, preferred_start_date, budget, terms_accepted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [userId, firstName, lastName, email, password, gender, nationality, dateOfBirth, educationLevel, intendedCourse, targetCountry, additionalInfo, linkedInProfile, preferredStartDate, budget, termsAccepted];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting enquiry into the database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  });
};
