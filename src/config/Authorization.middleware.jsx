import { useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';


const ProtectedRoute = ({children})=>{
    const [success, setSuccess] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    if(token == null){
        return <Navigate to='/login' />
    }else{

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
        },
            
        };
        fetch('/api/admin/authorization', requestOptions)
        .then(response=>{
            if(response.status == 200){
                setSuccess(true);
            }else{
                return navigate('/login')   

            }
        })
        if(success){
            return children
        }
        
    }
};

export default ProtectedRoute;