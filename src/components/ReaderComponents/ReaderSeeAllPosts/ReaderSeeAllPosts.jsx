import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import hostName from '../../../config';
import ReaderPostCard from '../ReaderPostCard/ReaderPostCard';
import './ReaderSeeAllPosts.css';

import Loading from '../../Partials/Loading/Loading';

function ReaderSeeAllPosts(){
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(null);
    useEffect(()=>{
        axios.defaults.baseURL = hostName;
        axios.get('/post/all')
        .then(response=>{
            if(response.status == 200){
                setLoading(false)
            }
            if(response){
                setPosts(response.data.posts)
            }else{
                alert('no post')
            }
        }) 
        .catch((e)=>{
            console.log(e)
        })
    }, []) 


    if(loading == true){
        return(
            <Loading/>
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