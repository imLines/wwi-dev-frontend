import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import hostName from '../../../config';


function AdminUpdateCategory(){
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    axios.defaults.baseURL = hostName;
    const navigate = useNavigate();
    let {categoryId} = useParams();
    
    useEffect(()=>{
        try{
            axios.get(`/category/${categoryId}`)
            .then(axios=>{
                setCategory(axios.data.category)
                setName(axios.data.category.name)
                setDescription(axios.data.category.description)
            }) 
        }catch(e){
            console.log(e)
        }
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        try{
            axios.put(`/category/update/${categoryId}`, {name, description})
            .then(axios=>{
                if(axios.status === 200){
                    navigate('/admin/category/all')
                }else{
                    console.log(axios.status)
                }
            })
        }catch(e){
            console.log(e)
        }
    }
    if(category == null){
        return(
            <>
                <p>Chargement</p>
            </>
        )
    }else{
        return(
            <>
                <form className="AdminUpdateCategory" onSubmit={handleSubmit}>
                    <h1>Change this category</h1>
                    <div>
                        <label htmlFor="name">Name :</label>
                        <input name="name" defaultValue={category.name} onChange={e=>setName(e.target.value)} type="text" />
                    </div>
                    <div>
                        <label htmlFor="description">Description :</label>
                        <input name="description" defaultValue={category.description} onChange={e=>setDescription(e.target.value)} type="text" />
                    </div>
                    <button type="submit">Change this category</button>
                </form>
            </>
        )
    }

};

export default AdminUpdateCategory;