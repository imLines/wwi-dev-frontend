import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../assets/logo-white.png';
import './AdminNavbar.css';

function AdminNavbar(){
    const [hamburgerApparence, setHamburgerApparence] = useState('AdminNavbar_hamburger-close')
    const [hamburgerContent, setHamburgerContent] = useState('AdminNavbar_no-see-ul')

    const setHamburger = ()=>{
        if(hamburgerApparence == 'AdminNavbar_hamburger-close'){
            setHamburgerApparence('AdminNavbar_hamburger-open')
            setHamburgerContent('AdminNavbar_see-ul')
        }else{
            setHamburgerApparence('AdminNavbar_hamburger-close')
            setHamburgerContent('AdminNavbar_no-see-ul')
        }
    }

    let activeStyle = {
        color: "#3B58CF",
      };
     
    return( 
        <nav className='AdminNavbar'>
            <div className='AdminNavBar_header'> 
                <div>
                    <img src={logo} className="AdminNavbar_logo"/>
                    <p className='AdminNavbar_p'>Admin Workspace</p>
                </div>
                <button onClick={setHamburger} className={`AdminNavbar_hamburger-button ${hamburgerApparence}`}></button>
            </div>
            <div className='AdminNavbar_hamburger-container'>
                <ul className={hamburgerContent}>
                    <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to="/admin/home" className='AdminNavbar_link' onClick={setHamburger}><li className='AdminNavbar_li'>Home</li></NavLink>
                    <NavLink style={({ isActive }) => isActive ? activeStyle : undefined}  to="/admin/newpost" className='AdminNavbar_link' onClick={setHamburger} ><li className='AdminNavbar_li'>Create a post</li></NavLink>
                    <NavLink style={({ isActive }) => isActive ? activeStyle : undefined}  to="/admin/post/all" className='AdminNavbar_link' onClick={setHamburger} ><li className='AdminNavbar_li'>See all post</li></NavLink>
                    <NavLink style={({ isActive }) => isActive ? activeStyle : undefined}  to="/admin/category/all" className='AdminNavbar_link' onClick={setHamburger} ><li className='AdminNavbar_li'>View categories</li></NavLink>
                    <NavLink style={({ isActive }) => isActive ? activeStyle : undefined}  to="/admin/account" className='AdminNavbar_link' onClick={setHamburger} ><li className='AdminNavbar_li'>My account</li></NavLink>
                </ul>
            </div>  
        </nav>
    )
};

export default AdminNavbar;