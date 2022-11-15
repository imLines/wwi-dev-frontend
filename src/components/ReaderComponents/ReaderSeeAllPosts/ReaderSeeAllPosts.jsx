import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import hostName from '../../../config';
import ReaderPostCard from '../ReaderPostCard/ReaderPostCard';

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
            <>
                <h2>Viewer Mode</h2>
                <section className='AdminSeeAllPosts'>
                    <div className='AdminSeeAllPosts_card-container'>
                        {posts?.map(post=><ReaderPostCard post={post} key={post.id} />)}
                    </div>
                </section> 
            </>
        )
    


    }
};

export default ReaderSeeAllPosts;