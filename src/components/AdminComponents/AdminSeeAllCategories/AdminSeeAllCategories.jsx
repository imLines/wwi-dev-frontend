import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import hostName from '../../../config';
import './AdminSeeAllCategories.css';


function AdminSeeAllCategories(){
    const [categories, setCategories] = useState(null)
    axios.defaults.baseURL = hostName;

    useEffect(()=>{
        axios.get('/category/all')
        .then(axios=>{
            setCategories(axios.data.categories)
            console.log(axios.data.categories)
        }) 

    }, [])

    const deleteCategory = (e, categoryId)=>{
        e.preventDefault();
        e.stopPropagation();
        if(window.confirm("You're sur to delete this category ?")){
            try{
                axios.delete(`/category/delete/${categoryId}`)
                .then(axios=>{
                    console.log(axios)
                })
            }catch(e){
                console.log(e)
            }
        }
    }

    if(categories == null){
        return(
            <>
            </>
        )
    }else{
        return(
            <>
                <Link to='/admin/category/new'>Create new category</Link>
                <section className="AdminSeeAllCategories">
                    <table cellSpacing="0">
                        <tbody>
                            <tr>
                                <th className="AdminSeeAllCategories_category-case" scope="col">Categorie Name</th>
                                <th className="AdminSeeAllCategories_option-case" scope="col">Change</th>
                                <th className="AdminSeeAllCategories_option-case" scope="col">Delete</th>
                            </tr>
                            {categories?.map((element, index)=>{
                                return(
                                    <tr key={index}>
                                        <th scope="row"><Link>{element?.name}</Link></th>
                                        <th scope="row"><Link to={`/admin/manager/products/update/${element.id}`}>Modifier</Link></th>
                                        <th scope="row"><button onClick={event=>deleteCategory(event, element.id)}>Supprimer</button> </th>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </section>
            </>
        )
    }
};

export default AdminSeeAllCategories;