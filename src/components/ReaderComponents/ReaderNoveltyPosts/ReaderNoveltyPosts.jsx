import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ReaderPostCard from '../ReaderPostCard/ReaderPostCard';
import './ReaderNoveltyPosts.css';
import hostName from '../../../config';


function ReaderNoveltyPosts(){
    const [posts, setPosts] = useState(null)

    axios.defaults.baseURL = hostName;
    useEffect(()=>{
        axios.get('/post/novelty') 
        .then(axios=>{
            setPosts(axios.data.posts)
        })
    }, [])

    if(posts == null){
        return(
            <>
               <p>Chargement</p> 
            </>
        )
    }else{
        return(
            <section className="ReaderNewPost">
                <h2>All new posts</h2>
                <div className="ReaderNoveltyPosts_card-container">
                    {posts?.map(post=><ReaderPostCard post={post} key={post.id} />)}
                </div>
            </section>
        )
    }
};

export default ReaderNoveltyPosts;