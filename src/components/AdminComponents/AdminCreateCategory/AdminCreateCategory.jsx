import { useState } from "react";
import hostName from '../../../config';
import axios from "axios";
import {useNavigate} from 'react-router-dom'


function AdminCreateCategory(){
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    
    axios.defaults.baseURL = hostName;
    const navigate = useNavigate();
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        try{
            axios.post('/category/new', {name, description}) 
            .then(axios=>{
                if(axios.status == 200){
                    navigate('/admin/category/all')
                }
            })
        }catch(e){
            console.log(e)
        }
        
    }

    return(
        <form className="AdminCreateCategory" onSubmit={handleSubmit}>
            <h1>Create new category</h1>
            <div>
                <label htmlFor="name">Name :</label>
                <input name="name" onChange={e=>setName(e.target.value)} type="text" />
            </div>
            <div>
                <label htmlFor="description">Description :</label>
                <input name="description" onChange={e=>setDescription(e.target.value)} type="text" />
            </div>
            <button type="submit">Create this category</button>
        </form>
    )
};

export default AdminCreateCategory;