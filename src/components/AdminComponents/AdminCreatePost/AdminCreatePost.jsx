import { Editor } from '@tinymce/tinymce-react';
import './AdminCreatePost.css';
import hostReactApp from '../../../config/hostReactApp.config';
import { firebase } from "../../../config/firebaseInit";
import {useEffect, useState} from 'react'; 
import { useNavigate } from "react-router-dom";
import Loading from '../../Partials/Loading/Loading';


function AdminCreatePost(){
    const [loading, setLoading] = useState(true)
    const [allCategories, setAllcategories] = useState(null);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [categorySelected, setCategorySelected] = useState('');
    const [picture, setPicture] = useState('');
    const [content, setContent] = useState('');

    const [errorMessage, setErrorMessage] = useState('')
    const [errorInputCategory, setErrorInputCategory] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
        try{
            const requestOptions = {
                method: 'GET',
                headers: {"Content-Type": "application/json"}
            }
            fetch('/api/category/all', requestOptions)
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                setAllcategories(data.categories)
                setLoading(false)
            })
        }catch(e){
            setLoading(false)
        }
    }, [])



    const handleSubmit = async (event)=>{
        try{
            setErrorMessage('')
            event.preventDefault()
            event.stopPropagation()
    
            setErrorInputCategory('')
            if(categorySelected == ''){
                return setErrorInput('error-input')
            }
            async function firebaseRun(){
                const storageRef = firebase.storage().ref(`/${categorySelected}/${title}`)
                const snapshot = await storageRef.put(file)
                const url = await snapshot.ref.getDownloadURL();
                return url    
            }        
            async function SendPost(){
                const urlByFirebase = await firebaseRun()
                setPicture(urlByFirebase)

                const token = localStorage.getItem('token');
                const requestOptionsPost = {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': token
                    },
                    body: JSON.stringify({title, content, picture: urlByFirebase, category: categorySelected, novelty: true})
                };
                const responsePost = await fetch('/api/post/new', requestOptionsPost);
                const dataPost = await responsePost.json()
                if(responsePost.status == 201){
                    setLoading(true)
                    const requestOptionsNewsletter = {
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/json",
                            'Authorization': token
                        },
                        body: JSON.stringify({picture: urlByFirebase, title, url: `${hostReactApp}/reader/post/${dataPost.post.id}`})
                    };
                    fetch('/api/newsletter/letter/new', requestOptionsNewsletter);
                    navigate('/admin/home')
                    
                }else{
                    setErrorMessage(dataPost.message)
                }
            }
            SendPost()
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
            <form className="AdminCreatePost main" onSubmit={handleSubmit}>
                <h1 className='font-title'>Create a Post</h1>
                <p className='error-message'>{errorMessage}</p>
                <div className="AdminCreatePost_section-container">
                    <label htmlFor="category">Choose a category :</label>
                    <select  name="category" value={categorySelected} className={`AdminCreatePost_category font-title ${errorInputCategory}`} onChange={event=>setCategorySelected(event.target.value)}>
                            <option value=''>Select a catégorie</option>
                            {allCategories?.map((e, key) => {
                            return <option key={key}  value={e.name}>{e.name}</option>;
                            })}
                    </select>
                </div>
                <div className="AdminCreatePost_section-container">
                    <label htmlFor="title">Choose a title :</label>
                    <input required className="AdminCreatePost_title-input" name="title" type='text' onChange={event=>setTitle(event.target.value)}/>
                </div>
                <div className="AdminCreatePost_section-container">
                    <label htmlFor="backgroundPicture">Choose a background picture :</label>
                    <input required className="AdminCreatePost_picture font-title" type='file' accept=".png,.jpg,.svg" name='backgroundPicture' onChange={event=>setFile(event.target.files[0])}/>
                </div>
                <div className="AdminCreatePost_section-container">
                    <label>Content :</label>
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
                <div className='AdminCreatePost_button-container'>
                    <button type='submit'>Send</button>
                </div>
            </form>
        )
    }

};

export default AdminCreatePost;