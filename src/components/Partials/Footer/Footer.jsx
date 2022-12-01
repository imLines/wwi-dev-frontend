import worldWideWeb from '../../../assets/icons/footer/worldwideweb.png';
import github from '../../../assets/icons/footer/github.png';
import twitter from '../../../assets/icons/footer/twitter.png';
import './Footer.css';
import Newsletter from '../Newsletter/Newsletter';

function Footer(){
    return(
        <>
            <footer className='Footer'>
            <Newsletter/>
                <div className='Footer_link-container'>
                    <a href='https://tony-hubert.tech'><img src={worldWideWeb}/></a>
                    <a href='https://github.com/imLines'><img src={github}/></a>
                    <a href='https://twitter.com/ouictoons'><img src={twitter}/></a>
                </div>
                <div className='Footer_contact-copy'>
                    <p>A question ? A request ? <a href='/contact'> Contact me ! </a></p>
                    <p className='copyright'>wwiDEV &copy; all right reserved - by imLines</p>
                </div>
            </footer> 
        </>
    )
};

export default Footer;