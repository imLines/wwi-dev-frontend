import { Outlet } from "react-router-dom";
import ReaderNavbar from "./ReaderComponents/ReaderNavbar/ReaderNavbar";

function Reader(){
    return(
        <>
            <ReaderNavbar/>
            <Outlet/>
        </>
    )
};

export default Reader; 