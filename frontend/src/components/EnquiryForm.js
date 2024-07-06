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
    password: '',
    gender: '',
    nationality: '',
    dateOfBirth: '',
    educationLevel: '',
    intendedCourse: '',
    targetCountry: '',
    additionalInfo: '',
    linkedInProfile: '',
    preferredStartDate: '',
    budget: '',
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
      const response = await axios.post('http://localhost:3000/api/enquiryform', formData); // Assuming your Express server is running on port 3000
      console.log('Response:', response.data);
      alert('Enquiry submitted successfully!');
      setUsername(response.data.firstName, response.data.lastName);
      navigate('/user/dashboard');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        nationality: '',
        dateOfBirth: '',
        educationLevel: '',
        intendedCourse: '',
        targetCountry: '',
        additionalInfo: '',
        linkedInProfile: '',
        preferredStartDate: '',
        budget: '',
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
            <span className="details">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
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
          <div className="button-container1">
            {step < 3 && <button type="button" onClick={handleNextStep}>Next</button>}
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
            <span className="details">Education Level</span>
            <input
              type="text"
              placeholder="Enter your education level"
              name="educationLevel"
              value={formData.educationLevel}
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
          <div className="button-container">
            <button type="button" onClick={handlePrevStep}>Previous</button>
            {step < 3 && <button type="button" onClick={handleNextStep}>Next</button>}
          </div>
        </div>

        {/* Step 3 */}
        <div className={`additional-details ${step === 3 ? 'active' : ''}`}>
          <div className="input-box">
            <span className="details">Additional Information</span>
            <textarea
              placeholder="Enter any additional information"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">LinkedIn Profile</span>
            <input
              type="url"
              placeholder="Enter your LinkedIn profile URL"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Preferred Start Date</span>
            <input
              type="date"
              name="preferredStartDate"
              value={formData.preferredStartDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Budget for Studies</span>
            <input
              type="number"
              placeholder="Enter your budget for studies"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box terms-container">
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <span className="terms">I accept the terms and conditions</span>
            </label>
          </div>
          <div className="button-container">
            <button type="button" onClick={handlePrevStep}>Previous</button>
            <div className="button">
              <input type="submit" value="Submit" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
