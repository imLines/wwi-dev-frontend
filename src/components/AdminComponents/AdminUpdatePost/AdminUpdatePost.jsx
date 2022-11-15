import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';
import { firebase } from "../../../config/firebaseInit";


import hostName from '../../../config';
import { useState } from "react";



function AdminUpdatePost(){
    const [post, setPost] = useState(null);
    const [allCategories, setAllCategories] = useState(null);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [categorySelected, setCategorySelected] = useState('any');
    const [picture, setPicture] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [novelty, setNovelty] = useState(true)

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

    const handleSubmit = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setCategory(categorySelected)
        if(file != null){
            const storageRef = firebase.storage().ref(`/${categorySelected}/${title}`);
            storageRef.put(file)
            .then((snapshot) => {
                return snapshot.ref.getDownloadURL();  
            })
            .then(url=>{
                setPicture(url)
            })
        }
        console.log(title, category, content, picture)
        axios.put(`/post/update/${post.id}`, {title, novelty, category, content, picture})
        .then(axios=>{
            console.log(axios)
        })
    }

    if(post == null || allCategories == ''){
        return(
            <>
                <p>Please wait...</p>
            </>
        )
    }else{
        return(
            <form  onSubmit={handleSubmit}>
            <div>
                <label htmlFor="category">Choose a category :</label>
                <select required name="category" value={categorySelected} onChange={event=>setCategorySelected(event.target.value)}>
                        <option value={'any'}>Select a catégorie</option>
                        {allCategories?.map((e, key) => {
                        return <option key={key}  value={e.name}>{e.name}</option>;
                        })}
                </select>
            </div>
            <div>
                <label htmlFor="title">Choose a title :</label>
                <input required defaultValue={post.title} name="title" type='text' onChange={event=>setTitle(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="backgroundPicture">Choose a background picture :</label>
                <input id="backgroundPicture" type='file' accept=".png,.jpg,.svg" name='backgroundPicture' onChange={event=>setFile(event.target.files[0])}/>
                <button type="button" onClick={deletePicture}>Delete picture</button>
            </div>
            <div>
                <img src={post.picture}/>
            </div>
            <div>
                <label htmlFor="novelty">Novelty</label> <br/>
                Yes<input name="novelty" type='radio' value={true} onChange={e=>setNovelty(e.target.value)}/>
                No<input name="novelty" type='radio' value={false}/>
            </div>
            <div>
                <label></label>
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
            <button type='submit'>Send</button>
        </form>
        )
    }
};

export default AdminUpdatePost;