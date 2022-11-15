import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hostName from '../../../config';
 

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
            <>
                {categories?.map((item, index) => {
                        return   <Link key={index} to={`/reader/category/${item.id}`} >{item.name} : {item.description}</Link>
                        })}
            </>
        )
    }
};

export default ReaderAllCategories;