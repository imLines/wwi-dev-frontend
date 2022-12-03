import {Link} from 'react-router-dom';
import './AdminHome.css';

function AdminHome(){

    return(
        <section className='AdminHome main'>
            <Link className='AdminHome_link' to='/admin/newpost'>
                Créer un post
            </Link>
            <Link className='AdminHome_link' to='/admin/post/all'>
                Voir tous les posts
            </Link>
            <Link className='AdminHome_link' to=''>
                Voir les nouveaux posts
            </Link> 
        </section>
    )
};
 
export default AdminHome;