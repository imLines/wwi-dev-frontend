import { Editor } from '@tinymce/tinymce-react';
import hostName from '../../../config';
import axios from 'axios';
import './AdminCreatePost.css';

import { firebase } from "../../../config/firebaseInit";



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

        
        const storageRef = firebase.storage().ref(`/${categorySelected}/${title}`);
        storageRef.put(file)
        .then((snapshot) => {
            return snapshot.ref.getDownloadURL();  
        })
        .then(url=>{
            setPicture(url)
            setCategory(categorySelected);
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios.defaults.baseURL = hostName;
            axios.post('/post/new',  {title, content, picture, category}) 
            .then(response=>{
                console.log(response)
                if(response.status == 200){
                    navigate('/admin/home')
                }else{
                    console.log(response)
                }
            })

        })


        
    }
   
   
    return(
        <form className="AdminCreatePost" onSubmit={handleSubmit}>
            <div className="AdminCreatePost_section-container">
                <label className="AdminCreatePost_label" htmlFor="category">Choose a category :</label>
                <select  name="category" value={categorySelected} className="AdminCreatePost_category" onChange={event=>setCategorySelected(event.target.value)}>
                        <option value={undefined}>Select a catégorie</option>
                        {allCategories?.map((e, key) => {
                        return <option key={key}  value={e.name}>{e.name}</option>;
                        })}
                </select>
            </div>
            <div className="AdminCreatePost_section-container">
                <label className="AdminCreatePost_label" htmlFor="title">Choose a title :</label>
                <input className="AdminCreatePost_title" name="title" type='text' onChange={event=>setTitle(event.target.value)}/>
            </div>
            <div className="AdminCreatePost_section-container">
                <label className="AdminCreatePost_label" htmlFor="backgroundPicture">Choose a background picture :</label>
                <input className="AdminCreatePost_picture" type='file' accept=".png,.jpg,.svg" name='backgroundPicture' onChange={event=>setFile(event.target.files[0])}/>
            </div>
            <div>
                <label></label>
                <Editor
                    apiKey='36er56ob38xx53aijhqghyl1y0h44x9qv1k5auqe8pkrcfzv'
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                    ],
                    toolbar: 'undo redo | underline | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | '+ ' | blocks | ' +
                    'removeformat | h1 | h2 | h3',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={event=>setContent(event)}
                    />

            </div>
            <button type='submit'>Send</button>
        </form>
    )

};

export default AdminCreatePost;