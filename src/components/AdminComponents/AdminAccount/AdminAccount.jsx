import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Partials/Loading/Loading";
import './AdminAccount.css';
import api from '../../../config/apiHost.config'

function AdminAccount(){
    const [loading, setLoading] = useState(true) 
    const [admin, setAdmin] = useState(null);
    const [newMail, setNewMail] = useState('')
    const [confirmNewMail, setConfirmNewMail] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [emailPopupSee, setEmailPopupSee] = useState('email-popup-no-see');
    const [namePopupSee, setNamePopupSee] = useState('name-popup-no-see');
    const [passwordPopupSee, setPasswordPopupSee] = useState('password-popup-no-see')
    const [backgroundBlur, setBackgroundBlur] = useState('');
    
    const navigateTo = useNavigate()

    useEffect(()=>{
        try{
            async function getAdmin(){
                const token = localStorage.getItem('token');
                const requestOptions = {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization' : token
                    }
                }
                const response = await fetch('/api/admin/info', requestOptions);
                if(response.status == 200){
                    const data = await response.json();
                    setAdmin(data.admin)
                    setLoading(false)
                }else{
                    localStorage.removeItem('token');
                    navigateTo('/')
                }
            }
            getAdmin()
        }catch(e){
            console.error(e)
        }
    }, [])

    function emailPopup(){
        setEmailPopupSee('email-popup-see')
        setBackgroundBlur('blur')
    }
    function closeEmailPopup(e){
        e.preventDefault()
        setEmailPopupSee('email-popup-no-see')
        setBackgroundBlur('')
    }
    async function changeMail(e){
        e.preventDefault()
        try{
            setLoading(true)
            if(confirmNewMail == newMail && newMail != admin.email){
                const token = localStorage.getItem('token')
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : token
                    },
                    body: JSON.stringify({
                        email: newMail,
                        password: admin.password,
                        name: admin.name
                    })
                }
                const response = await fetch(`/api/admin/update/${admin.id}`, requestOptions);
                if(response.status == 200){
                    location.reload();
                }else{
                    navigateTo('/login')
                }    
            }
        }catch(e){
            setLoading(false)
        }
    }

    function namePopup(){
        setNamePopupSee('name-popup-see');
        setBackgroundBlur('blur')
    }
    function closeNamePopup(e){
        e.preventDefault();
        setNamePopupSee('name-popup-no-see');
        setBackgroundBlur('')
    }
    async function changeName(e){
        e.preventDefault();
        try{
            setLoading(true)
            if(newName != admin.name){
                const token = localStorage.getItem('token')
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : token
                    },
                    body: JSON.stringify({
                        email: admin.email,
                        password: admin.password,
                        name: newName
                    })
                }
                const response = await fetch(`/api/admin/update/${admin.id}`, requestOptions);
                if(response.status == 200){
                    location.reload();
                }else{
                    navigateTo('/login')
                }    
            }
        }catch(e){
            setLoading(false)
            console.log(e)
        }
    }
    
    function passwordPopup(){
        setPasswordPopupSee('')
        setBackgroundBlur('blur')
    }
    function closePasswordPopup(e){
        e.preventDefault()
        setPasswordPopupSee('password-popup-no-see')
        setBackgroundBlur('')
    }
    async function changePassword(e){ 
        e.preventDefault();
        try{
            setLoading(true)
            setLoading(true)
            if(newPassword == confirmNewPassword){
                const token = localStorage.getItem('token')
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : token
                    },
                    body: JSON.stringify({
                        email: admin.email,
                        password: newPassword,
                        name: admin.name
                    })
                }
                const response = await fetch(`${api}}/admin/update/${admin.id}`, requestOptions);
                if(response.status == 200){
                    location.reload();
                }else{
                    navigateTo('/login')
                }    
            }
        }catch(e){
        }
    }

    function logout(){
        try{
            localStorage.removeItem('token');
            navigateTo('/login')
        }catch(e){
        }
    }

    if(loading == false){
        return(
            <section className="AdminAccount_component main">
                <form onSubmit={changeMail} className={`popup ${emailPopupSee}`}>
                    <div className="close-button-container">
                        <button className="close-button" onClick={closeEmailPopup}></button>
                    </div>
                    <p>Last Email : {admin?.email}</p>
                    <input type='email' onChange={e=>setNewMail(e.target.value)} placeholder="new adress mail"/>
                    <input type='email' onChange={e=>setConfirmNewMail(e.target.value)} placeholder="confirm new adress mail"/>
                    <button className="AdminAccount_submit font-title" type="submit">Change email</button>
                </form>
                <form onSubmit={changeName} className={`popup ${namePopupSee}`}>
                    <div className="close-button-container">
                        <button className="close-button" onClick={closeNamePopup}></button>
                    </div>
                    <p>Last Name : {admin?.name}</p>
                    <input type='text' onChange={e=>setNewName(e.target.value)} placeholder="new name"/>
                    <button className="AdminAccount_submit font-title" type="submit">Change name</button>
                </form>
                <form onSubmit={changePassword} className={`popup ${passwordPopupSee}`}>
                    <div className="close-button-container">
                        <button className="close-button" onClick={closePasswordPopup}></button>
                    </div>
                    <input autoComplete="new-password" type='password' onChange={e=>setNewPassword(e.target.value)} placeholder="new password"/>
                    <input autoComplete="new-password" type='password' onChange={e=>setConfirmNewPassword(e.target.value)} placeholder="confirm new password"/>
                    <button className="AdminAccount_submit font-title" type="submit">Change password</button>
                </form>
                <section className={`AdminAccount ${backgroundBlur}`}>
                    <h2 className="font-title">account setting of {admin?.name}</h2>
                    <p>Email : {admin?.email}</p>
                    <p>Name : {admin?.name}</p>
                    <button className="AdminAccount_button-select-change font-title" onClick={emailPopup}>Modifie email</button>
                    <button className="AdminAccount_button-select-change font-title" onClick={namePopup}>Modifie Name</button>
                    <button className="AdminAccount_button-select-change font-title" onClick={passwordPopup}>Modifie password</button>
                    <button className="AdminAccount_button-select-change font-title" onClick={logout}>Logout</button>
                </section>
            </section>
        )
    }else{
        return(
            <Loading/>
        )
    }

}

export default AdminAccount;