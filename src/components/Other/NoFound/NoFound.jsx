import './NoFound.css';
import logo from '../../../assets/logo-white.png';
import { Link } from 'react-router-dom';

function NoFound(){
    return(
        <section className='NoFound'>
            <img src={logo}/>
            <h1>404</h1>
            <p>This page doesn't exist</p>
            <Link to="/" className='noFound-back-link'>Revenir en lieu sûr</Link>
        </section>
    )
};

export default NoFound;