import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import hostName from '../../../config';

function AdminAccount(){
    const [admin, setAdmin] = useState(null)
    useEffect(()=>{
        try{
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios.defaults.baseURL = hostName;
            
            async function getAdmin(){
                const response = await axios.get('/admin/info');
                setAdmin(response.data.admin)
            }
            getAdmin()
        }catch(e){
            console.error(e)
        }
    }, [])

    if(admin){
        return(
            <section>
                <h2>account setting of {admin?.name}</h2>
                <p>Email : {admin?.email}</p>
                <button>Modifie email</button>
                <button>Modifie password</button>
            </section>
        )
    }else{
        return(
            <>
                <p>Chargement...</p>
            </>
        )
    }

}

export default AdminAccount;