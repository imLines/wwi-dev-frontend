import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hostName from '../../../config';
import './ReaderAllCategories.css'
 

function ReaderAllCategories(){
    const [categories, setCategories] = useState(null);
    axios.defaults.baseURL = hostName;

    useEffect(()=>{
        async function getCategories(){
            const response = await axios.get('/category/all')
            setCategories(response.data.categories)
            console.log(categories)
        }
        getCategories();

    }, [])

    if(categories == null){
        return(
            <>
                <p>Chargement...</p>
            </>
        )
    }else{
        return(
            <section className="ReaderAllCategories">
                {categories?.map((item, index) => {
                        return   <Link className="ReaderAllCategories_link" key={index} to={`/reader/category/${item.id}`} >{item.name} : {item.description}</Link>
                        })}
            </section>
        )
    }
};

export default ReaderAllCategories;