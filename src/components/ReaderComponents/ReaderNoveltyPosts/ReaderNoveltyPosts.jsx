import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ReaderPostCard from '../ReaderPostCard/ReaderPostCard';
import './ReaderNoveltyPosts.css';
import hostName from '../../../config';
import Loading from "../../Partials/Loading/Loading";


function ReaderNoveltyPosts(){
    const [loading, setLoading] = useState(true)
    const [noFoundNoveltyPosts, setNoFoundNoveltyPosts] = useState(false)
    const [posts, setPosts] = useState(null)

    axios.defaults.baseURL = hostName;
    useEffect(()=>{
        axios.get('/post/novelty') 
        .then(response=>{
            if(response.status == 200){
                setLoading(false)
                setPosts(response.data.posts)
            }else{

                console.log(posts)
            }
        })
        .catch((e)=>{
            if(e.response.status == 404){
                setNoFoundNoveltyPosts(true)
            }
            setLoading(false)
        })
    }, [])


    if(loading == true){
        return(
            <Loading/>
        )
    }else if(noFoundNoveltyPosts == true){
        return(
            <>
                no
            </>
        )
        
    }else{
        return(
            <section className="ReaderNoveltyPosts">
                <h1>All new posts</h1>
                <div className="ReaderNoveltyPosts_card-container">
                    {posts?.map(post=><ReaderPostCard post={post} key={post.id} />)}
                </div>
            </section>
        )
    }
};

export default ReaderNoveltyPosts;