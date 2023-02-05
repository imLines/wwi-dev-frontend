import logo from '../../../assets/logo-white.png';
import './AdminLogin.css';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../Partials/Loading/Loading';
import api from '../../../config/apiHost.config';
 
function AdminLogin(){
    const [loading, setLoading] = useState(false) 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [errorInput, setErrorInput] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event)=>{
        try{
            setErrorMessage('')
            event.preventDefault()
            event.stopPropagation()
            setLoading(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            };
            fetch(`${api}/admin/login`, requestOptions)
            .then(response=>{
                if(response.status != 200){
                    setErrorInput('error-input')
                    setLoading(false)
                }
                return response.json()
            })
            .then(data=>{ 
                if(data.token){
                    localStorage.setItem('token', data.token)
                    navigate('/admin/home')
                }
                setErrorMessage(data.message)
            })
        }catch(e){
            location.reload()
        }
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
                <p className='error-message'>{errorMessage}</p>
                <div className='AdminLogin_section'>
                    <label htmlFor='email'>Email</label>
                    <input className={errorInput} type="email" name="email" placeholder="Email" onChange={event=>setEmail(event.target.value)}/>
                </div>
                <div className='AdminLogin_section'>
                    <label htmlFor='password'>Password</label>
                    <input className={errorInput} type="password" name="password" placeholder="Mot de passe" onChange={event=>setPassword(event.target.value)}/>
                </div>
                <button className='font-title' type='submit'>Me connecter</button>
            </form>
        )

    }

};

export default AdminLogin;