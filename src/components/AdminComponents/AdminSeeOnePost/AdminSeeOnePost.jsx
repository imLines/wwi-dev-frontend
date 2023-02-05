import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
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
            async function getPostsAndCategory(){

                function setDateForBestLook(date){
                    const toDate = new Date(date)
                    setDateOfPost(new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                        }).format(toDate))
                } 
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }
                const responseGetPosts = await fetch(`/api/post/${postId}`, requestOptions);
                const dataGetPosts = await responseGetPosts.json();
                setPost(dataGetPosts.post);
                setDateForBestLook(dataGetPosts.post.createdAt);
                if(dataGetPosts.post.categoryId != null){
                    const responseGetCategory = await fetch(`/api/category/${dataGetPosts.post.categoryId}`, requestOptions);
                    const dataGetCategory = await responseGetCategory.json();
                    setCategory(dataGetCategory.category)
                    setLoading(false)
                }
            }
            getPostsAndCategory()
        }catch(e){
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
                const token = localStorage.getItem('token');
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
                fetch(`/api/post/delete/${postId}`, requestOptions);
                navigate('/admin/post/all');
            }catch(e){
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
                <button className="font-title" onClick={e=>deletePost(e, post.id)}>Delete this post</button>
                <button className="font-title" onClick={modifiePost}>Update this post</button>
                <div className="AdminSeeOnePost_header"> 
                    <h1 className="font-title">{post.title}</h1>
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
                    <h1 className="font-title">{post.title}</h1>
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