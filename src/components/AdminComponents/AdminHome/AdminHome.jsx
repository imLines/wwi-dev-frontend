import {Link} from 'react-router-dom';
import './AdminHome.css';

function AdminHome(){

    return(
        <section className='AdminHome main'>
            <Link className='AdminHome_link' to='/admin/newpost'>
                <p className='font-title'>Create post</p>
            </Link>
            <Link className='AdminHome_link' to='/admin/post/all'>
                <p className='font-title'>See all posts</p>
            </Link>
            <Link className='AdminHome_link' to='/admin/category/all'>
                <p className='font-title'>See all categories</p>
            </Link> 
        </section>
    )
};
 
export default AdminHome;