import {Outlet} from 'react-router-dom';

function Admin(){
    return(
        <>
            <p>Admin page's</p>
            <Outlet/>
        </>
    )
};

export default Admin;