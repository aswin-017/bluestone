import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/EnquiryForm.css';
import { useNavigate } from 'react-router-dom';

const EnquiryForm = ({ setUsername }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    nationality: '',
    dateOfBirth: '',
    highestEducationLevel: '',
    intendedCourse: '',
    targetCountry: '',
    additionalInfo: '',
    preferredStartDate: '',
    fieldOfStudy: '',
    graduationYear: '',
    englishProficiency: '',
    otherLanguages: '',
    careerGoals: '',
    skillsInterests: '',
    parentGuardianContact: '',
    accommodationAssistance: false,
    travelAssistance: false,
    termsAccepted: false,
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/enquiryform', formData); // Replace with your API endpoint
      console.log('Response:', response.data);
      alert('Enquiry submitted successfully!');
      setUsername(`${response.data.firstName} ${response.data.lastName}`);
      navigate('/user/dashboard');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        nationality: '',
        dateOfBirth: '',
        highestEducationLevel: '',
        intendedCourse: '',
        targetCountry: '',
        additionalInfo: '',
        preferredStartDate: '',
        fieldOfStudy: '',
        graduationYear: '',
        englishProficiency: '',
        otherLanguages: '',
        careerGoals: '',
        skillsInterests: '',
        parentGuardianContact: '',
        accommodationAssistance: false,
        travelAssistance: false,
        termsAccepted: false,
      });
      setStep(1);
    } catch (error) {
      console.error('Error:', error);
      alert('Enquiry submission failed. Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Enquiry Form</div>
      <form onSubmit={handleSubmit} className="form-step">
        {/* Step 1 */}
        <div className={`user-details ${step === 1 ? 'active' : ''}`}>
          <div className="input-box">
            <span className="details">First Name</span>
            <input
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Last Name</span>
            <input
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input
              type="text"
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="gender-details">
            <div className="gender-title">Gender</div>
            <div className="category">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  required
                />
                <span className="gender">Male</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  required
                />
                <span className="gender">Female</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleChange}
                  required
                />
                <span className="gender">Other</span>
              </label>
            </div>
          </div>
          <div className="button-container">
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`education-details ${step === 2 ? 'active' : ''}`}>
          <div className="input-box">
            <span className="details">Nationality</span>
            <input
              type="text"
              placeholder="Enter your nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Date of Birth</span>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Highest Education Level</span>
            <input
              type="text"
              placeholder="Enter your highest education level"
              name="highestEducationLevel"
              value={formData.highestEducationLevel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Field of Study</span>
            <input
              type="text"
              placeholder="Enter your field of study"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Graduation Year</span>
            <input
              type="text"
              placeholder="Enter your graduation year"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Intended Course</span>
            <input
              type="text"
              placeholder="Enter your intended course"
              name="intendedCourse"
              value={formData.intendedCourse}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Target Country</span>
            <input
              type="text"
              placeholder="Enter your target country"
              name="targetCountry"
              value={formData.targetCountry}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">English Proficiency</span>
            <input
              type="text"
              placeholder="Enter your English proficiency level"
              name="englishProficiency"
              value={formData.englishProficiency}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Other Languages</span>
            <input
              type="text"
              placeholder="Enter other languages you speak"
              name="otherLanguages"
              value={formData.otherLanguages}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="button" onClick={handlePrevStep}>Previous</button>
            <button type="button" onClick={handleNextStep}>Save and Continue</button>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`additional-details ${step === 3 ? 'active' : ''}`}>
          <div className="input-box">
            <span className="details">Career Goals</span>
            <textarea
              placeholder="Enter your career goals"
              name="careerGoals"
              value={formData.careerGoals}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Skills and Interests</span>
            <textarea
              placeholder="Enter your skills and interests"
              name="skillsInterests"
              value={formData.skillsInterests}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Parent/Guardian Contact</span>
            <textarea
              placeholder="Enter parent/guardian contact details"
              name="parentGuardianContact"
              value={formData.parentGuardianContact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <label>
              <input
                type="checkbox"
                name="accommodationAssistance"
                checked={formData.accommodationAssistance}
                onChange={handleChange}
              />
              Accommodation Assistance
            </label>
          </div>
          <div className="input-box">
            <label>
              <input
                type="checkbox"
                name="travelAssistance"
                checked={formData.travelAssistance}
                onChange={handleChange}
              />
              Travel Assistance
            </label>
          </div>
          <div className="input-box">
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              I accept the terms and conditions
            </label>
          </div>
          <div className="button-container">
            <button type="button" onClick={handlePrevStep}>Previous</button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
