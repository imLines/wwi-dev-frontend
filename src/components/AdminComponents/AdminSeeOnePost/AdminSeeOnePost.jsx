import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import hostName from "../../../config";
import './AdminSeeOnePost.css';

function AdminSeeOnePost(){
    const [post, setPost] = useState(null)

    let {postId} = useParams();
    useEffect(()=>{
        axios.defaults.baseURL = hostName;
        axios.get(`/post/${postId}`)
        .then(axios=>{
            setPost(axios.data.post)
        })
    }, [])

    if(post == null){
        return(
            <section>
                <p>Chargement</p>
            </section>
        )
    }else{
        return(
            <section>
                <div>
                    <img src={post.picture}/>
                    <p>{post.author}, created the {post.createdAt}</p>
                </div>
                <div>
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: post.content}} />
                </div>

            </section>
        )
    }

};

export default AdminSeeOnePost;