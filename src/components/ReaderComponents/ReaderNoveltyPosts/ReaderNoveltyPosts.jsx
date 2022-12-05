import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ReaderPostCard from '../ReaderPostCard/ReaderPostCard';
import './ReaderNoveltyPosts.css';
import hostName from '../../../config/hostName';
import Loading from "../../Partials/Loading/Loading";
import { useNavigate } from "react-router-dom";


function ReaderNoveltyPosts(){
    const [loading, setLoading] = useState(true)
    const [noFoundNoveltyPosts, setNoFoundNoveltyPosts] = useState(false)
    const [posts, setPosts] = useState(null)
    
    const navigate = useNavigate();
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
            <section className="NoFoundContent">
                <h2>Any news for the moment, sorry.</h2>
                <h2>You can suscribe to the newsletter for get all novelty</h2>
            </section>
        )
        
    }else{
        return(
            <section className="ReaderNoveltyPosts main">
                <h1 className="font-title">All new posts</h1>
                <p>(since 15 days)</p>
                <div className="ReaderNoveltyPosts_card-container">
                    {posts?.map(post=><ReaderPostCard post={post} key={post.id} />)}
                </div>
            </section>
        )
    }
};

export default ReaderNoveltyPosts;