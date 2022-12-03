import './ErrorServer.css';
import logo from '../../../assets/logo-white.png';

function ErrorServer(){
    return(
        <section className='ErrorServer'>
            <img src={logo}/>
            <h1>Maintenance</h1>
            <p>This blog is under maintenance, please come back later</p>
        </section>
    )
};

export default ErrorServer;