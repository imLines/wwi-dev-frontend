import {Outlet} from 'react-router-dom';
import AdminNavbar from './AdminComponents/AdminNavbar/AdminNavbar';

function Admin(){
    return(
        <>
            <AdminNavbar/>
            <Outlet/>
        </>
    )
};

export default Admin;