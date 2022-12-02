import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../assets/logo-white.png';
import './ReaderNavbar.css'

function ReaderNavbar(){
    const [hamburgerApparence, setHamburgerApparence] = useState('ReaderNavbar_hamburger-close')
    const [hamburgerContent, setHamburgerContent] = useState('ReaderNavbar_no-see-ul')

    const setHamburger = ()=>{
        if(hamburgerApparence == 'ReaderNavbar_hamburger-close'){
            setHamburgerApparence('ReaderNavbar_hamburger-open')
            setHamburgerContent('ReaderNavbar_see-ul')
        }else{
            setHamburgerApparence('ReaderNavbar_hamburger-close')
            setHamburgerContent('ReaderNavbar_no-see-ul')
        }
    }

    let activeStyle = { 
        color: "#3B58CF",
      };
    


    return(
        <nav className='ReaderNavbar'>
            <div className='ReaderNavbar_header'>
                <Link to="/"><img src={logo} className="ReaderNavbar_logo"/></Link>
                <button onClick={setHamburger} className={`ReaderNavbar_hamburger-button ${hamburgerApparence}`}></button>
            </div>
            <div className='ReaderNavbar_hamburger-container'>
                <ul className={hamburgerContent}>
                    <NavLink style={({ isActive }) => isActive ? activeStyle : undefined}  end to="/" className='ReaderNavbar_link' onClick={setHamburger} ><li className='ReaderNavbar_li'>Home</li></NavLink>
                    <NavLink style={({ isActive }) => isActive ? activeStyle : undefined}  to="/reader/news" className='ReaderNavbar_link' onClick={setHamburger} ><li className='ReaderNavbar_li'>News</li></NavLink>
                    <NavLink style={({ isActive }) => isActive ? activeStyle : undefined}  to="/reader/allposts" className='ReaderNavbar_link' onClick={setHamburger} ><li className='ReaderNavbar_li'>See all post</li></NavLink>
                    <NavLink style={({ isActive }) => isActive ? activeStyle : undefined}  to="/reader/categories" className='ReaderNavbar_link' onClick={setHamburger} ><li className='ReaderNavbar_li'>View categories</li></NavLink>
                </ul>
            </div> 
        </nav> 
    )
}; 

export default ReaderNavbar; 