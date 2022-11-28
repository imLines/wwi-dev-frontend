import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import hostName from '../../../config';
import ReaderPostCard from '../ReaderPostCard/ReaderPostCard';
import './ReaderSeeAllPosts.css';

function ReaderSeeAllPosts(){
    const [posts, setPosts] = useState(null);
    useEffect(()=>{
        axios.defaults.baseURL = hostName;
        axios.get('/post/all')
        .then(posts=>{
            if(posts){
                setPosts(posts.data.posts)
            }else{
                alert('no post')
            }
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
            <section  className='ReaderSeeAllPosts'>
                <h1>All posts</h1>
                <div className='ReaderSeeAllPosts_card-container'>
                    {posts?.map(post=><ReaderPostCard post={post} key={post.id} />)}
                </div>
            </section> 
        )
    }
};

export default ReaderSeeAllPosts;