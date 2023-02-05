import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './AdminUpdateCategory.css';
import Loading from "../../Partials/Loading/Loading";
import api from "../../../config/apiHost.config";


function AdminUpdateCategory(){
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    const [errorInput, setErrorInput] = useState('')

    

    const navigate = useNavigate();
    let {categoryId} = useParams();
    
    useEffect(()=>{
        try{
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
            fetch(`${api}/category/${categoryId}`, requestOptions)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                setCategory(data.category);
                setName(data.category.name);
                setDescription(data.category.description);
                setLoading(false);
            })
        }catch(e){
            setLoading(false);
            location.reload();
        }
    },[])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        try{
            setLoading(true)
            const token = localStorage.getItem('token');
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({name, description})
            };
            const response = await fetch(`${api}/category/update/${categoryId}`, requestOptions);
            if(response.status == 200){
                navigate('/admin/category/all');
            }else if(response.status == 400){
                setErrorInput('error-input')
                setErrorMessage(e.response.data.message)
                setLoading(false)
            }
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