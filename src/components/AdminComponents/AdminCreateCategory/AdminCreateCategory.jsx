import { useState } from "react";
import hostName from '../../../config/hostName';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import './AdminCreateCategory.css';
import Loading from "../../Partials/Loading/Loading"; 


function AdminCreateCategory(){
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    const [errorInput, setErrorInput] = useState('')
    
    axios.defaults.baseURL = hostName;
    const navigate = useNavigate();
    
    const handleSubmit = (e)=>{
        setLoading(true)
        e.preventDefault();
        e.stopPropagation();
        try{
            axios.post('/category/new', {name, description}) 
            .then(axios=>{
                if(axios.status == 200){
                    setLoading(false)
                    navigate('/admin/category/all')
                }
            })
            .catch((e)=>{
                if(e.response.status == 400){
                    setErrorMessage(e.response.data.message)
                    setErrorInput('error-input')
                    setLoading(false)
                }
            })
        }catch(e){
            setLoading(false)
            console.log(e)
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