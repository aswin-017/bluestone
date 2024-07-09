import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs';
import '../assets/css/SideNav.css'; // Adjust the path as per your project structure

const SideNav = ({ setLoggedInUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <aside id="sidebar">
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsGrid1X2Fill className='icon_header' /> Bluestone
        </div>
        <span className='icon close_icon'>X</span>
      </div>

      <ul className='sidebar-list'>
          <Link to="/user/dashboard" className="sidebar-link">
        <li className='sidebar-list-item'>
            <BsGrid1X2Fill className='icon' /> Dashboard
        </li>
          </Link>
          <Link to="/enquiryform" className="sidebar-link">
        <li className='sidebar-list-item'>
            <BsFillArchiveFill className='icon' /> Enquiry Form
        </li>
          </Link>
        <li className='sidebar-list-item'>
          <Link to="/about" className="sidebar-link">
            <BsFillGrid3X3GapFill className='icon' /> About
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/contact" className="sidebar-link">
            <BsPeopleFill className='icon' /> Contact
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/settings" className="sidebar-link">
            <BsFillGearFill className='icon' /> Settings
          </Link>
        </li>
        <li className='sidebar-list-item' onClick={handleLogout}>
          <BsMenuButtonWideFill className='icon' /> Logout
        </li>
      </ul>
    </aside>
  );
};

export default SideNav;
