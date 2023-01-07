import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom';
import hostName from './hostName';


const ProtectedRoute = ({children})=>{
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    if(token == null){
        return <Navigate to='/login' />
    }else{
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.defaults.baseURL = hostName;
        axios.get('/admin/authorization')
        .catch(function (error) {
            if (error) {
                return navigate('/login')   
            }
          });
        return children;
    }
};

export default ProtectedRoute;