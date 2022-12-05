import { Editor } from '@tinymce/tinymce-react';
import hostName from '../../../config/hostName';
import axios from 'axios';
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

    const [errorInputCategory, setErrorInputCategory] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
        try{
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios.defaults.baseURL = hostName;
            axios.get('/category/all')
            .then(allcategories=>{
                setAllcategories(allcategories.data.categories)
                setLoading(false)
            })
            .catch((e)=>{
                console.log(e)
                setLoading(false)
            })
        }catch(e){
            console.log(e)
            setLoading(false)
        }
    }, [])



    const handleSubmit = async (event)=>{
        try{
            setLoading(true)
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
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                axios.defaults.baseURL = hostName;
                axios.post('/post/new',  {title, content, picture: urlByFirebase, category: categorySelected, novelty: true}) 
                .then(response=>{
                    if(response.status == 200){
                        axios.post('/newsletter/letter/new', {picture: urlByFirebase, title, url: `${hostReactApp}/reader/post/${response.data.post.id}`}) 
                            .then(newsletter=>{
                                console.log(newsletter)
                            })
                            .catch((e=>{
                                setLoading(false)
                                alert(e.reponse.data.message)
                            }))
                        navigate('/admin/home')
                    }else if(response.status == 400){
                        console.log(response)
                        setLoading(false)
                    }else{
                        location.reload()
                    }
                })
                .catch((e)=>{
                    console.log(e)
                    setLoading(false) 
                })
            }
            SendPost()
        }catch(e){
            console.log(e)
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