import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ReaderPostCard.css'

const ReaderPostCard = function({post}){
    const [data, setData]= useState('');

    useEffect(()=>{
        setData(post.content)
    }, [])

    return( 
        <Link className='ReaderPostCard' to={`/reader/post/${post.id}`}>
            <img className='ReaderPostCard_picture' src={post.picture}/>
            <div className='ReaderPostCard_title-container'>
                <p>{post.title}</p>
            </div>
        </Link> 
    );
}; 

export default ReaderPostCard;