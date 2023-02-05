import './App.css';
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';


import ProtectedRoute from './config/Authorization.middleware';

import Reader from "./components/Reader";
import ReaderHome from './components/ReaderComponents/ReaderHome/ReaderHome';
import ReaderSeeAllPosts from './components/ReaderComponents/ReaderSeeAllPosts/ReaderSeeAllPosts';
import ReaderAllCategories from './components/ReaderComponents/ReaderAllCategories/ReaderAllCategories';
import ReaderAllPostOnCategory from './components/ReaderComponents/ReaderAllPostOnCategory/ReaderAllPostOnCategory';
import ReaderSeeOnePost from './components/ReaderComponents/ReaderSeeOnePost/ReaderSeeOnePost';
import ReaderNoveltyPosts from './components/ReaderComponents/ReaderNoveltyPosts/ReaderNoveltyPosts';

import Admin from './components/Admin';
import AdminLogin from './components/AdminComponents/AdminLogin/AdminLogin';
import AdminHome from './components/AdminComponents/AdminHome/AdminHome';
import AdminCreatePost from './components/AdminComponents/AdminCreatePost/AdminCreatePost';
import AdminSeeAllPosts from './components/AdminComponents/AdminSeeAllPosts/AdminSeeAllPosts';
import AdminSeeOnePost from './components/AdminComponents/AdminSeeOnePost/AdminSeeOnePost';
import AdminSeeAllCategories from './components/AdminComponents/AdminSeeAllCategories/AdminSeeAllCategories';
import AdminCreateCategory from './components/AdminComponents/AdminCreateCategory/AdminCreateCategory';
import AdminUpdateCategory from './components/AdminComponents/AdminUpdateCategory/AdminUpdateCategory';
import AdminUpdatePost from './components/AdminComponents/AdminUpdatePost/AdminUpdatePost';
import AdminAccount from './components/AdminComponents/AdminAccount/AdminAccount';

import NoFound from './components/Other/NoFound/NoFound';
import NoFoundAdmin from './components/Other/NoFound/NoFoundAdmin';
import ErrorServer from './components/Other/ErrorServer/ErrorServer';
import { useState } from 'react';

function App() {
  const [errorConnection, setErrorConnection] = useState(false);


  useEffect(()=>{
    try{
      const requestOptions = {
        method: 'GET'
      }
      fetch('/api', requestOptions)
      .then(response=>{
        if(response.status == 200){
          console.log('Connected.')
        }else{
          setErrorConnection(true)
        }
      })
    }catch(e){
      console.log(e)
    }
  }, [])

  if(errorConnection == true){
    return(
      <ErrorServer/>
    )
  }else{
    return (
      <>
  
        <Routes>
          <Route path='*' element={<NoFound/>}/>
          <Route exact path="/" element={<ReaderHome/>}/>
            <Route exact path='/reader/' element={<Reader/>}>
            <Route exact path='/reader/allposts' element={<ReaderSeeAllPosts/>}/>
            <Route exact path='/reader/categories' element={<ReaderAllCategories/>}/>
            <Route exact path="/reader/category/:categoryId" element={<ReaderAllPostOnCategory/>} />
            <Route exact path='/reader/post/:postId' element={<ReaderSeeOnePost/>} />
            <Route exact path='/reader/news' element={<ReaderNoveltyPosts/>}/>
          </Route>
  
          <Route exact path='/login' element={<AdminLogin/>}/>
          <Route exact path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}>
            <Route path='/admin/nofound' element={<NoFoundAdmin/>}/>
            <Route exact path='/admin/account' element={<AdminAccount/>}/>
            <Route exact path='/admin/home' element={<AdminHome/>}/>
            <Route exact path='/admin/newpost' element={<AdminCreatePost/>}/>
            <Route exact path='/admin/post/all' element={<AdminSeeAllPosts/>}/>
            <Route exact path="/admin/category/all" element={<AdminSeeAllCategories/>}/>
            <Route exact path='/admin/category/new' element={<AdminCreateCategory/>}/>
            <Route exact path="/admin/category/update/:categoryId" element={<AdminUpdateCategory/>}/>
            <Route exact path='/admin/post/update/:postId' element={<AdminUpdatePost/>}/>
            <Route exact path='/admin/post/:postId' element={<AdminSeeOnePost/>}/>
          </Route>
        </Routes>
      </>
    )
  }

}
 
export default App
