import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';
import { firebase } from "../../../config/firebaseInit";

import './AdminUpdatePost.css';
import hostName from '../../../config';
import { useState } from "react";



function AdminUpdatePost(){
    const [post, setPost] = useState(null);
    const [allCategories, setAllCategories] = useState(null);
    const [title, setTitle] = useState(post?.title);
    const [file, setFile] = useState('');
    const [categorySelected, setCategorySelected] = useState('');
    const [picture, setPicture] = useState(post?.picture);
    const [content, setContent] = useState(post?.content);

    const navigate = useNavigate();
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.defaults.baseURL = hostName;

    let {postId} = useParams();
    axios.defaults.baseURL = hostName;

    useEffect(()=>{
        async function getPost(){
            const response = await axios.get(`/post/${postId}`)
            setPost(response.data.post)

        }
        async function getAllCategory(){
            const response = await axios.get('/category/all')
            setAllCategories(response.data.categories)

        }
        getPost();
        getAllCategory();
        if(post == null){
            getPost()
        }else{
            setPicture(post.picture)
            setTitle(post.title)
            setContent(post.content)
        }
    
    }, [])

    const deletePicture = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        const inputField = document.getElementById('backgroundPicture');
        inputField.value = null;
        setFile(null)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        event.stopPropagation()        
        async function firebaseRun(){
            if(file == ''){
                return
            }
            const storageRef = firebase.storage().ref(`/${categorySelected}/${title}`)
            const snapshot = await storageRef.put(file)
            const url = await snapshot.ref.getDownloadURL();
            return url
        }        
        async function SendPost(){
            try{
                if(file != ''){
                    const urlByFirebase = await firebaseRun()
                    setPicture(urlByFirebase)
                }
                axios.put(`/post/update/${postId}`, {title, content, picture, category: categorySelected}) 
                .then(response=>{
                    if(response.status == 200){
                        navigate('/admin/home')
                        console.log(response)
                    }else{
                        console.log(response)
                    }
                })
                .catch((e)=>{
                    console.log(e)
                })
            }catch(e){
                console.log(e)
            }
        }
        SendPost()

    }

    if(post == null || allCategories == ''){
        return( 
            <>
                <p>Please wait...</p>
            </>
        )
    }else{
        return(
            <form className="AdminUpdatePost main"  onSubmit={handleSubmit}>
            <div className="AdminUpdatePost_section-container">
                <label htmlFor="category">Choose a category :</label>
                <select required className={`AdminUpdatePost_category `} name="category" value={categorySelected} onChange={event=>setCategorySelected(event.target.value)}>
                        <option value='' >Select a catégorie</option>
                        {allCategories?.map((e, key) => {
                        return <option key={key}  value={e.name}>{e.name}</option>;
                        })}
                </select>
            </div>
            <div className="AdminUpdatePost_section-container">
                <label htmlFor="title">Choose a title :</label>
                <input className="AdminUpdatePost_title-input" required defaultValue={post.title} name="title" type='text' onChange={event=>setTitle(event.target.value)}/>
            </div>
            <div className="AdminUpdatePost_section-container">
                <label htmlFor="backgroundPicture">Choose a background picture :</label>
                <input id="backgroundPicture" type='file' accept=".png,.jpg,.svg" name='backgroundPicture' onChange={event=>setFile(event.target.files[0])}/>
                <button type="button" onClick={deletePicture}>Delete picture</button>
            </div>
            <div className="AdminUpdatePost_section-container">
                <label>Content : </label>
                <Editor
                    required
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
                    initialValue={post.content}
                    />

            </div>
            <div className="AdminUpdatePost_button-container">
                <button className="AdminUpdatePost_button-send" type='submit'>Send</button>
            </div>
        </form>
        )
    }
};

export default AdminUpdatePost;