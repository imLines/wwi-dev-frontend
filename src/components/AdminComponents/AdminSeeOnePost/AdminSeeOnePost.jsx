import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import hostName from "../../../config";
import './AdminSeeOnePost.css';
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function AdminSeeOnePost(){
    const [post, setPost] = useState(null);
    const [category, setCategory] = useState(null)
    const [dateOfPost, setDateOfPost] = useState(null)

    const navigate = useNavigate();

    let {postId} = useParams();
    useEffect(()=>{
        axios.defaults.baseURL = hostName;
        async function getPost(){
            const responsePost = await axios.get(`/post/${postId}`)
            setPost(responsePost.data.post)
        }
        async function getCategory(){
            const responseCategory = await axios.get(`/category/${post.categoryId}`)
            setCategory(responseCategory.data.category)
        }
        
        if(post == null){
            getPost()
        }else{
            function setDateForBestLook(date){
                const toDate = new Date(date)
                setDateOfPost(new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(toDate))
    
            } 
            setDateForBestLook(post.createdAt)
            getCategory()
        }
    }, [post, category])


    function modifiePost(){
        navigate(`/admin/post/update/${post.id}`)
    }

    if(post == null || category == null){
        return(
            <section>
                <p>Chargement</p>
            </section>
        )
    }else{
        return(
            <section className="AdminSeeOnePost main">
                <div className="AdminSeeOnePost_header"> 
                    <h1>{post.title}</h1>
                    <img src={post.picture}/>
                    <h2>{category.name}</h2>
                    <p>{post.author}, created the {dateOfPost}</p>
                </div>
                <div dangerouslySetInnerHTML={{__html: post.content}} />
                <button onClick={modifiePost}>Update this post</button>
            </section>
            
        )
    }

};

export default AdminSeeOnePost;