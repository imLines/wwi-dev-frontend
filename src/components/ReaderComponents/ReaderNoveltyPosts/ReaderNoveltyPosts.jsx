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
    const [noveltyPosts, setNoveltyPosts] = useState(null)
    
    axios.defaults.baseURL = hostName;
    useEffect(()=>{
        try{
            async function getNoveltyPosts(){
                const response = await axios.get('/post/novelty');
                const noveltyPostByAPI = await response.data.posts
                setNoveltyPosts(noveltyPostByAPI);
                if(response.data.length < 1){
                    setNoFoundNoveltyPosts(true)
                }
                setLoading(false)
            }
            if(noveltyPosts == null){
                getNoveltyPosts()
            }
        }catch(e){
            console.log(e)
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