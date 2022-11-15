import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import hostName from "../../../config";

function ReaderSeeOnePost(){
    const [post, setPost] = useState(null);
    const [category, setCategory] = useState(null)

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
            getCategory()
        }
    }, [post, category])

    if(post == null || category == null){
        return(
            <section>
                <p>Chargement...</p>
            </section>
        )
    }else{
        return(
            <>
            <section>
                <div>
                    <img src={post.picture}/>
                    <h2>{category.name}</h2>
                    <p>{post.author}, created the {post.createdAt}</p>
                </div>
                <div>
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: post.content}} />
                </div>

            </section>
            </>
        )
    }

};

export default ReaderSeeOnePost;