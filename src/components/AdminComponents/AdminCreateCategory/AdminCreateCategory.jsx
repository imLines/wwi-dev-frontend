import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import './AdminCreateCategory.css';
import Loading from "../../Partials/Loading/Loading"; 
import api from "../../../config/apiHost.config";


function AdminCreateCategory(){
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    const [errorInput, setErrorInput] = useState('')
    
    const navigate = useNavigate();
    
    const handleSubmit = (e)=>{
        setLoading(true)
        e.preventDefault();
        e.stopPropagation();
        try{
            const token = localStorage.getItem('token');
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({name, description})
            };
            fetch(`${api}/category/new`, requestOptions)
            .then(response=>{
                if(response.status == 200){
                    setLoading(false);
                    navigate('/admin/category/all')
                }else{
                    setErrorInput('error-input')
                    setLoading(false) 
                    return response.json()
                }
            })
            .then(data=>{
                if(data.message){
                    setErrorMessage(data.message)
                }
            })
        }catch(e){
            setLoading(false)
        }
    }


    if(loading == true){
        return(
            <Loading/>
        )
    }else{
        return(
            <form className="AdminCreateCategory main" onSubmit={handleSubmit}>
                <h1>Create new category</h1>
                <p className='errorMessage'>{errorMessage}</p>
                <div className="AdminCreateCategory_section">
                    <label htmlFor="name">Name :</label>
                    <input className={`${errorInput}`} name="name" onChange={e=>setName(e.target.value)} type="text"  />
                </div>
                <div className="AdminCreateCategory_section">
                    <label htmlFor="description">Description :</label>
                    <textarea className={`${errorInput}`} name="description" onChange={e=>setDescription(e.target.value)} type="text"  />
                </div>
                <button type="submit">Create this category</button>
            </form>
        )
    }
 
};

export default AdminCreateCategory;