import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import './Newsletter.css'
import hostName from '../../../config/hostName';


function Newsletter(){
    const [recipientEmail, setRecipientEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    
    useEffect(()=>{
    }, [successMessage, errorMessage])
    
    axios.defaults.baseURL = hostName;
    const handleSubmit =  (e)=>{ 
        e.preventDefault();
        try{
            axios.post('/newsletter/recipient/new', {email: recipientEmail}) 
            .then(response=>{
                if(response.status == 200){
                    setSuccessMessage(response.data.message)
                    setTimeout(function(){
                        setSuccessMessage(null)
                    }, 8000)
                }
            })
            .catch((e=>{
                setErrorMessage(e.response.data.message)
                setTimeout(function(){
                    setErrorMessage(null)
                }, 8000)
            }))
        }catch(e){
            console.log(e); 
        }
    }

    if(successMessage == null && errorMessage == null){
        return(
            <form className="Newsletter" onSubmit={handleSubmit}>
                <h4>Suscribe to the newsletter : </h4>
                <div className="Newsletter_input-button">
                    <input placeholder="You're email here" onChange={e=>setRecipientEmail(e.target.value)} type="email" required />
                    <button className="font-title" type="submit" >Suscribe</button>
                </div>
            </form>
        )
    }

    if(successMessage != null){
        return(
            <div className="Newsletter">
                <h4>{successMessage}</h4>
            </div>
        )
    }
    if(errorMessage != null){
        return(
            <div className="Newsletter">
                <h4>{errorMessage}</h4>
            </div>
        )
    }

};

export default Newsletter;