import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import hostName from '../../../config';
import './AdminAccount.css'

function AdminAccount(){
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
    
    useEffect(()=>{
        try{
            axios.defaults.baseURL = hostName;
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            
            async function getAdmin(){
                const response = await axios.get('/admin/info');
                setAdmin(response.data.admin)
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
            if(confirmNewMail == newMail){
                axios.put(`/admin/update/${admin.id}`, {email: newMail, password: admin.password, name: admin.name})
                .then(response=>{
                    if(response.status == 200){
                        location.reload();
                    }
                })      
            }
        }catch(e){
            console.log(e)
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
            axios.put(`/admin/update/${admin.id}`, {name: newName, password: admin.password, email: admin.email})
            .then(response=>{
                if(response.status == 200){
                    location.reload()
                }
            })
        }catch(e){
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
    function changePassword(e){ 
        e.preventDefault();
        try{
            if(newPassword == confirmNewPassword){
                axios.put(`/admin/update/${admin.id}`, {name: admin.name, password: newPassword, email: admin.email})
                .then(response=>{
                    if(response.status == 200){
                        location.reload();
                    }
                })
            }
        }catch(e){
            console.log(e)
        }
    }

    if(admin){
        return(
            <section className="AdminAccount_component">
                <form onSubmit={changeMail} className={`popup ${emailPopupSee}`}>
                    <div className="close-button-container">
                        <button className="close-button" onClick={closeEmailPopup}></button>
                    </div>
                    <p>Last Email : {admin?.email}</p>
                    <input type='email' onChange={e=>setNewMail(e.target.value)} placeholder="new adress mail"/>
                    <input type='email' onChange={e=>setConfirmNewMail(e.target.value)} placeholder="confirm new adress mail"/>
                    <button className="AdminAccount_submit" type="submit">Change email</button>
                </form>
                <form onSubmit={changeName} className={`popup ${namePopupSee}`}>
                    <div className="close-button-container">
                        <button className="close-button" onClick={closeNamePopup}></button>
                    </div>
                    <p>Last Name : {admin?.name}</p>
                    <input type='text' onChange={e=>setNewName(e.target.value)} placeholder="new name"/>
                    <button className="AdminAccount_submit" type="submit">Change name</button>
                </form>
                <form onSubmit={changePassword} className={`popup ${passwordPopupSee}`}>
                    <div className="close-button-container">
                        <button className="close-button" onClick={closePasswordPopup}></button>
                    </div>
                    <input autoComplete="new-password" type='password' onChange={e=>setNewPassword(e.target.value)} placeholder="new password"/>
                    <input autoComplete="new-password" type='password' onChange={e=>setConfirmNewPassword(e.target.value)} placeholder="confirm new password"/>
                    <button className="AdminAccount_submit" type="submit">Change password</button>
                </form>
                <section className={`AdminAccount ${backgroundBlur}`}>
                    <h2>account setting of {admin?.name}</h2>
                    <p>Email : {admin?.email}</p>
                    <p>Name : {admin?.name}</p>
                    <button className="AdminAccount_button-select-change" onClick={emailPopup}>Modifie email</button>
                    <button className="AdminAccount_button-select-change" onClick={namePopup}>Modifie Name</button>
                    <button className="AdminAccount_button-select-change" onClick={passwordPopup}>Modifie password</button>
                </section>
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