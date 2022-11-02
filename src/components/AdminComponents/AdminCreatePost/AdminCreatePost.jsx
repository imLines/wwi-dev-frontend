import { TrixEditor } from "react-trix";
import "trix/dist/trix";
import hostName from '../../../config';
import axios from 'axios';
import storage from '../../../config/firebaseConfig';

import {useEffect, useState} from 'react'; 
import { useNavigate } from "react-router-dom";


function AdminCreatePost(){
    const [allCategories, setAllcategories] = useState(null);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [categorySelected, setCategorySelected] = useState('');
    const [picture, setPicture] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.defaults.baseURL = hostName;
        axios.get('/category/all')
        .then(allcategories=>{
            setAllcategories(allcategories.data.categories)
        })
    }, [])

    const handleSubmit = async (event)=>{
        event.preventDefault()
        event.stopPropagation()
       
        storage.ref(`/${categorySelected}/${title}`).put(file)
        .on("state_changed", console.log(), alert, () => {
            storage.ref(`/${categorySelected}/`).child(title).getDownloadURL()
            .then((url) => {
                setPicture(url);
            })

        })
        setCategory(categorySelected);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.defaults.baseURL = hostName;
        axios.post('/post/new',  {title, content, picture, category}) 
        .then(response=>{
            console.log(response)
            if(response.status == 200){
                navigate('/admin/home')
            }
        })
        
    }
   
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="category">Choose a category</label>
                <select  name="category" value={categorySelected}  onChange={event=>setCategorySelected(event.target.value)}>
                        <option value={undefined}>Choose a catégorie</option>
                        {allCategories?.map((e, key) => {
                        return <option key={key}  value={e.name}>{e.name}</option>;
                        })}
                </select>
            </div>
            <div>
                <label htmlFor="title">Choose a title</label>
                <input name="title" type='text' onChange={event=>setTitle(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="backgroundPicture">Choose a background picture</label>
                <input type='file' name='backgroundPicture' onChange={event=>setFile(event.target.files[0])}/>
            </div>
            <div>
                <label></label>
                <TrixEditor  onChange={event=>setContent(event)} />
            </div>
            <button type='submit'>Send</button>
        </form>
    )
};

export default AdminCreatePost;