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
    const [category, setCategory] = useState(null)
    const [pathInLocation, setPathInLocation] = useState('')
    const [popupCopiedPath, setPopupCopiedPath] = useState('no-show-popup-copied');

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
        if(post == null){
            getPost()
        }else{
            getCategory()
        }
        setPathInLocation(location.origin+location.pathname)
    }, [post])

    function copyLink(){
        navigator.clipboard.writeText(pathInLocation)
        setPopupCopiedPath('show-popup-copied')
        setTimeout(function(){
            setPopupCopiedPath('no-show-popup-copied')
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
            <section>
                <div>
                    <img src={post.picture}/>
                    <h2>{category.name}</h2>
                    <p>{post.author}, created the {post.createdAt}</p>
                </div>
                <div>
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: post.content}} />
                </div>
                <div>
                    <p>Share :</p>
                    <FacebookShareButton url={pathInLocation}>
                        <FacebookIcon size={40} round={true}/>
                    </FacebookShareButton>
                    <TwitterShareButton url={pathInLocation}>
                        <TwitterIcon size={40} round={true}/>
                    </TwitterShareButton>
                    <WhatsappShareButton url={pathInLocation}>
                        <WhatsappIcon size={40} round={true}/>
                    </WhatsappShareButton>
                    <div className={popupCopiedPath}>
                        <p>Copied !</p>
                    </div>
                    <button onClick={copyLink}>Copy Link</button>
                </div>

            </section>
            </>
        )
    }

};

export default ReaderSeeOnePost;