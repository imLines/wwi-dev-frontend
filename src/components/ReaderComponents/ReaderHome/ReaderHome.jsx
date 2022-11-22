import ReaderNavbar from '../ReaderNavbar/ReaderNavbar';
import avatar from '../../../assets/me-on-avatar.svg';

function ReaderHome(){
    return(
        <>
            <ReaderNavbar/>
            <section>
                <img src={avatar}/>
                <h2>Welcome to wwiDEV</h2>
                <p>wwiDEV, or  "We work into Development" is a personal blog create by me. I'm Tony, I've 23yo and I want to transmit my knowledge. This blog is built with the MERN stack (wait ! 
                    The M letter is for Mysql, isn't for Mongo). If you want to see all my production, you can check <a href='https://www.tony-hubert.tech'>my personnal website</a>. If you want to get all news directly in you're mail box, suscribe in my newsletter. 
                    You can note that I'm not english (neither americain). It's normal if my english is'nt perfect but I give my all.<br/> Enjoy guy
                </p>
            </section>
        </>
    )
};

export default ReaderHome;