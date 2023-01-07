import { Outlet } from "react-router-dom";
import ReaderNavbar from "./ReaderComponents/ReaderNavbar/ReaderNavbar";
import Newsletter from './Partials/Newsletter/Newsletter';
import Footer from "./Partials/Footer/Footer";

function Reader(){
    return(
        <>
            <ReaderNavbar/>
            <Outlet/>
            <Footer/>
        </>
    )
};

export default Reader; 