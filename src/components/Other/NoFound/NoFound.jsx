import './NoFound.css';
import logo from '../../../assets/logo-white.png';

function NoFound(){
    return(
        <section className='NoFound'>
            <img src={logo}/>
            <h1>404</h1>
            <p>This page doesn't exist</p>
        </section>
    )
};

export default NoFound;