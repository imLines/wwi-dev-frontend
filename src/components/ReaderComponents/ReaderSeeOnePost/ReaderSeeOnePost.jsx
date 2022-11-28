import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ReaderSeeOnePost.css';
import axios from 'axios';
import hostName from "../../../config";
import {FacebookShareButton, FacebookIcon,
        TwitterShareButton, TwitterIcon,
        WhatsappShareButton, WhatsappIcon
} from 'react-share'; 

function ReaderSeeOnePost(){
    const [post, setPost] = useState(null);
    const [dateOfPost, setDateOfPost] = useState(null);
    const [category, setCategory] = useState(null)
    const [pathInLocation, setPathInLocation] = useState('')
    const [copiedPath, setCopiedPath] = useState('Copy Link');

    let {postId} = useParams();
    useEffect(()=>{
        axios.defaults.baseURL = hostName;
        async function getPost(){
            const responsePost = await axios.get(`/post/${postId}`)
            setPost(responsePost.data.post)
        }
        async function getCategory(){
            const responseCategory = await axios.get(`/category/${post.categoryId}`)
            setCategory(responseCategory.data.category)
        }
        function setDateForBestLook(date){
            const toDate = new Date(date)
            setDateOfPost(new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
              }).format(toDate))

        }

        if(post == null){
            getPost()
        }else{
            setDateForBestLook(post.createdAt)
            getCategory()
        }
        setPathInLocation(location.origin+location.pathname)
    }, [post])

    function copyLink(){
        navigator.clipboard.writeText(pathInLocation)
        setCopiedPath('copied')
        setTimeout(function(){
            setCopiedPath('Copy Link')
        }, 3000)
    }


    if(post == null || category == null){
        return(
            <section>
                <p>Chargement...</p>
            </section>
        )
    }else{
        return(
            <>
            <section className="ReaderSeeOnePost">
                <div className="ReaderSeeOnePost_header">
                    <h1>{post.title}</h1>
                    <img src={post.picture}/>
                    <p>In the category <b>{category.name}</b></p>
                    <p>Author : <b>{post.author}</b>, created the {dateOfPost}</p>
                </div>
                <div className="ReaderSeeOnePost_content-container">
                    <div className="ReaderSeeOnePost_content" dangerouslySetInnerHTML={{__html: post.content}} />
                </div>
                <div className="ReaderSeeOnePost_share-container">
                    <p>Share :</p>
                    <FacebookShareButton className="ReaderSeeOnePost_link" url={pathInLocation}>
                        <FacebookIcon size={40} round={true}/>
                    </FacebookShareButton>
                    <TwitterShareButton className="ReaderSeeOnePost_link" url={pathInLocation}>
                        <TwitterIcon size={40} round={true}/>
                    </TwitterShareButton>
                    <WhatsappShareButton className="ReaderSeeOnePost_link" url={pathInLocation}>
                        <WhatsappIcon size={40} round={true}/>
                    </WhatsappShareButton>
                    <button className={`ReaderSeeOnePost_button-copy-link ${copiedPath}`} onClick={copyLink}>{copiedPath}</button>
                </div>

            </section> 
            </>
        )
    }

};

export default ReaderSeeOnePost;