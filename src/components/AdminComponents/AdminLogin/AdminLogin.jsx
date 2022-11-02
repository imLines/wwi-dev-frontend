import logo from '../../../assets/logo.svg';
import './AdminLogin.css';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import hostName from '../../../config';

function AdminLogin(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event)=>{
        event.preventDefault()
        event.stopPropagation()
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({email: email, password: password})
        // };

        // fetch('/api/v1', requestOptions)
        // .then(response=>{
        //     return response.json()
        // })
        // .then(mssg=>{
        //     console.log(mssg)
        // })
        axios.defaults.baseURL = hostName;
        axios.post('/admin/login', {email, password})
        .then(response=>{
            localStorage.setItem('token', response.data.token)
            navigate('/admin/home')
        });

    
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <img src={logo} alt='logo du blog' className='adminLogin-logo'/>
            </div>
            <div>
                <label htmlFor='email'/>
                <input type="email" name="email" placeholder="Email" onChange={event=>setEmail(event.target.value)}/>
            </div>
            <div>
                <label htmlFor='password'/>
                <input type="password" name="password" placeholder="Mot de passe" onChange={event=>setPassword(event.target.value)}/>
            </div>
            <button type='submit'>Me connecter</button>
        </form>
    )
};

export default AdminLogin;