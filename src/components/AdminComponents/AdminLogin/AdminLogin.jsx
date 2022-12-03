import logo from '../../../assets/logo-white.png';
import './AdminLogin.css';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import hostName from '../../../config';
import Loading from '../../Partials/Loading/Loading';
 
function AdminLogin(){
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [errorInput, setErrorInput] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event)=>{
        event.preventDefault()
        event.stopPropagation()
        setLoading(true)
        axios.defaults.baseURL = hostName;
        axios.post('/admin/login', {email, password})
        .then(response=>{
            localStorage.setItem('token', response.data.token)
            navigate('/admin/home')
        })
        .catch((e=>{
            setErrorMessage(e.response.data.message);
            setErrorInput('error-input')
            console.log(errorInput)
        }))
    }

    if(loading == true){
        return(
            <Loading/>
        )
    }else{
        return(
            <form className='AdminLogin' onSubmit={handleSubmit}>
                <div>
                    <img src={logo} alt='logo du blog' className='adminLogin-logo'/>
                </div>
                <p className='errorMessage'>{errorMessage}</p>
                <div className='AdminLogin_section'>
                    <label htmlFor='email'>Email</label>
                    <input className={errorInput} type="email" name="email" placeholder="Email" onChange={event=>setEmail(event.target.value)}/>
                </div>
                <div className='AdminLogin_section'>
                    <label htmlFor='password'>Password</label>
                    <input className={errorInput} type="password" name="password" placeholder="Mot de passe" onChange={event=>setPassword(event.target.value)}/>
                </div>
                <button type='submit'>Me connecter</button>
            </form>
        )

    }

};

export default AdminLogin;