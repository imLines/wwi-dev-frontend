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
                if(responseGetPost.data.post.categoryId != null){
                    axios.get(`/category/${responseGetPost.data.post.categoryId}`)
                    .then(responseGetCategory=>{
                        setCategory(responseGetCategory.data.category)
                        
                        setLoading(false)
                    })
                    .catch((e)=>{
                        console.log(e)
                        setLoading(false)
                    })
                }
                setLoading(false)
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
    }, [])

    const deletePost = (e, postId)=>{
        if(window.confirm("You're sur to delete this post ?")){
            setLoading(true)
            e.preventDefault();
            e.stopPropagation();
            try{
                axios.delete(`/post/delete/${postId}`)
                .then(response=>{
                    if(response.status == 200){
                        navigate('/admin/post/all')
                        setLoading(false);
                    }
                })
                .catch((e)=>{
                    setLoading(false)
                    console.log(e);
                })
            }catch(e){
                console.log(e);
                location.reload();
            }
        }
    }


    function modifiePost(){
        navigate(`/admin/post/update/${post.id}`)
    }

    if(loading == true){
        return(
            <Loading/>
        )
    }else if(category != null){
        return(
            <section className="AdminSeeOnePost main">
                <button onClick={e=>deletePost(e, post.id)}>Delete this post</button>
                <button onClick={modifiePost}>Update this post</button>
                <div className="AdminSeeOnePost_header"> 
                    <h1>{post.title}</h1>
                    <h2>{category?.name}</h2> 
                    <p>{post.author}, created the {dateOfPost}</p>
                    <img src={post.picture}/>
                </div>
                <div dangerouslySetInnerHTML={{__html: post.content}} />
            </section>
            
        )
    }else{
        return(
            <section className="AdminSeeOnePost main">
                <button onClick={e=>deletePost(e, post.id)}>Delete this post</button>
                <button onClick={modifiePost}>Update this post</button>
                <div className="AdminSeeOnePost_header"> 
                    <h1>{post.title}</h1>
                    <p>{post.author}, created the {dateOfPost}</p>
                    <img src={post.picture}/>
                    <h2 className="error-message">Any Category, need to provide this for publish in reader mode.</h2>
                </div>
                <div dangerouslySetInnerHTML={{__html: post.content}} />
            </section>
            
        )
    }

};

export default AdminSeeOnePost;