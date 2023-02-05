import { useState } from "react";
import { useEffect } from "react";
import ReaderPostCard from '../ReaderPostCard/ReaderPostCard';
import './ReaderNoveltyPosts.css';
import Loading from "../../Partials/Loading/Loading";
import api from "../../../config/apiHost.config";

function ReaderNoveltyPosts(){
    const [loading, setLoading] = useState(true)
    const [noFoundNoveltyPosts, setNoFoundNoveltyPosts] = useState(false)
    const [noveltyPosts, setNoveltyPosts] = useState(null)
    
    useEffect(()=>{
        try{
            const requestOptions = {
                method: 'GET',
                headers : { 'Content-Type': 'application/json' }
            };
            fetch(`${api}/post/novelty`, requestOptions)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                if(data.posts.length < 1){
                    setNoFoundNoveltyPosts(true)
                    setLoading(false)
                }else{
                    setNoveltyPosts(data.posts)
                    setLoading(false)
                }
            })
        }catch(e){
        }
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
                    {noveltyPosts?.map(post=><ReaderPostCard post={post} key={post.id} />)}
                </div>
            </section>
        )
    }
};

export default ReaderNoveltyPosts;