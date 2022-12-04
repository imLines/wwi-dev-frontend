import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import hostName from "../../../config";
import './AdminSeeOnePost.css';
import Loading from '../../Partials/Loading/Loading';


function AdminSeeOnePost(){
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [category, setCategory] = useState(null);
    const [dateOfPost, setDateOfPost] = useState(null);

    const navigate = useNavigate();

    let {postId} = useParams();
    useEffect(()=>{
        try{
            axios.defaults.baseURL = hostName;
            axios.get(`/post/${postId}`)
            .then(responseGetPost=>{
                setPost(responseGetPost.data.post)
                function setDateForBestLook(date){
                    const toDate = new Date(date)
                    setDateOfPost(new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                        }).format(toDate))
                } 
                setDateForBestLook(responseGetPost.data.post.createdAt)
                axios.get(`/category/${responseGetPost.data.post.categoryId}`)
                .then(responseGetCategory=>{
                    setCategory(responseGetCategory.data.category)
                    
                    setLoading(false)
                })
                .catch((e)=>{
                    console.log(e)
                    setLoading(false)
                })
            })
            .catch((e)=>{
                console.log(e)
                setLoading(false);
            })

        }catch(e){
            console.log(e);
            setLoading(false);
            location.reload();
        }
    }, [post, category])


    function modifiePost(){
        navigate(`/admin/post/update/${post.id}`)
    }

    if(loading == true && category == null){
        return(
            <Loading/>
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