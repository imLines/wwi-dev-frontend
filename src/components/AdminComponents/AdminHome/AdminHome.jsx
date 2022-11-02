import {Link} from 'react-router-dom';

function AdminHome(){

    return(
        <>
            <Link to='/admin/newpost'>
                <button>Créer un post</button>
            </Link>
            <Link to=''>
                <button>Voir tous les posts</button>
            </Link>
            <Link to=''>
                <button>Voir les nouveaux posts</button>
            </Link>
        </>
    )
};

export default AdminHome;