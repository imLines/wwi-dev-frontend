import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import hostName from '../../../config/hostName';
import './AdminUpdateCategory.css';
import Loading from "../../Partials/Loading/Loading";


function AdminUpdateCategory(){
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    const [errorInput, setErrorInput] = useState('')

    

    axios.defaults.baseURL = hostName;
    const navigate = useNavigate();
    let {categoryId} = useParams();
    
    useEffect(()=>{
        try{
            axios.get(`/category/${categoryId}`)
            .then(response=>{
                setCategory(response.data.category);
                setName(response.data.category.name);
                setDescription(response.data.category.description);
                setLoading(false);
            }) 
            .catch((e)=>{
                setLoading(false)
                console.log(e)
            })
        }catch(e){
            setLoading(false);
            console.log(e);
            location.reload();
        }
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        try{
            setLoading(true)
            axios.put(`/category/update/${categoryId}`, {name, description})
            .then(axios=>{
                if(axios.status === 200){
                    navigate('/admin/category/all')
                }else{
                    setLoading(false)
                    console.log(axios.status)
                }
            })
            .catch((e)=>{
                if(e.response.status == 400){
                    setErrorInput('error-input')
                    setErrorMessage(e.response.data.message)
                    setLoading(false)
                }
            })
        }catch(e){
            console.log(e)
            location.reload()
        }
    }


    
    if(loading == true){
        return(
            <Loading/>
        )
    }else{
        return( 
            <form className="AdminUpdateCategory main" onSubmit={handleSubmit}>
                <h1>Change this category</h1>
                <p className='errorMessage'>{errorMessage}</p>
                <div className="AdminUpdateCategory_section">
                    <label htmlFor="name">Name :</label>
                    <input className={`${errorInput}`} name="name" defaultValue={category.name} onChange={e=>setName(e.target.value)} type="text" />
                </div>
                <div className="AdminUpdateCategory_section">
                    <label htmlFor="description">Description :</label>
                    <textarea className={`${errorInput}`} name="description" defaultValue={category.description} onChange={e=>setDescription(e.target.value)} type="text" />
                </div>
                <button type="submit">Change this category</button>
            </form>
        )
    }

};

export default AdminUpdateCategory;