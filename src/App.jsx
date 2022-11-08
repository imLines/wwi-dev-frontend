import './App.css';
import {Routes, Route} from 'react-router-dom';

import ProtectedRoute from './config/Authorization.middleware';

import Reader from './components/Reader';
import Admin from './components/Admin';
import AdminLogin from './components/AdminComponents/AdminLogin/AdminLogin';
import AdminHome from './components/AdminComponents/AdminHome/AdminHome';
import AdminCreatePost from './components/AdminComponents/AdminCreatePost/AdminCreatePost';
import AdminSeeAllPosts from './components/AdminComponents/AdminSeeAllPosts/AdminSeeAllPosts';
import AdminSeeOnePost from './components/AdminComponents/AdminSeeOnePost/AdminSeeOnePost';
import AdminSeeAllCategories from './components/AdminComponents/AdminSeeAllCategories/AdminSeeAllCategories';
import AdminCreateCategory from './components/AdminCreateCategory/AdminCreateCategory';

function App() {

  return (
    <>

      <Routes>
        <Route path="/reader" element={<Reader/>}>

        </Route>

        <Route exact path='/login' element={<AdminLogin/>}/>
        <Route exact path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}>
          <Route exact path='/admin/home' element={<AdminHome/>}/>
          <Route exact path='/admin/post/:postId' element={<AdminSeeOnePost/>}/>
          <Route exact path='/admin/newpost' element={<AdminCreatePost/>}/>
          <Route exact path='/admin/post/all' element={<AdminSeeAllPosts/>}/>
          <Route exact path="/admin/category/all" element={<AdminSeeAllCategories/>}/>
          <Route exact path='/admin/category/new' element={<AdminCreateCategory/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
