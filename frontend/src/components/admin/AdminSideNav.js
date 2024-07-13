import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BsGrid1X2Fill, BsPeopleFill, BsFillGearFill, BsFillBarChartFill 
} from 'react-icons/bs';
import '../../assets/css/SideNav.css'; // Adjust the path as per your project structure

const AdminSideNav = ({ setLoggedInAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInAdmin(null);
    navigate('/admin/login');
  };

  return (
    <aside id="sidebar">
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsGrid1X2Fill className='icon_header' /> Admin
        </div>
        <span className='icon close_icon'>X</span>
      </div>

      <ul className='sidebar-list'>
        <Link to="/admin/dashboard" className="sidebar-link">
          <li className='sidebar-list-item'>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </li>
        </Link>
        <Link to="/admin/userdetails" className="sidebar-link">
          <li className='sidebar-list-item'>
            <BsPeopleFill className='icon' /> User Details
          </li>
        </Link>
        <Link to="/admin/reports" className="sidebar-link">
          <li className='sidebar-list-item'>
            <BsFillBarChartFill className='icon' /> Reports
          </li>
        </Link>
        <Link to="/admin/settings" className="sidebar-link">
          <li className='sidebar-list-item'>
            <BsFillGearFill className='icon' /> Settings
          </li>
        </Link>
        <li className='sidebar-list-item' onClick={handleLogout}>
          <BsGrid1X2Fill className='icon' /> Logout
        </li>
      </ul>
    </aside>
  );
};

export default AdminSideNav;
