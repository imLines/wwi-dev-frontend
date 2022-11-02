import './App.css';
import {Routes, Route} from 'react-router-dom';

import Reader from './components/Reader';
import Admin from './components/Admin';
import AdminLogin from './components/AdminComponents/AdminLogin/AdminLogin';
import AdminHome from './components/AdminComponents/AdminHome/AdminHome';
import AdminCreatePost from './components/AdminComponents/AdminCreatePost/AdminCreatePost';

function App() {

  return (
    <>

      <Routes>
        <Route path="/reader" element={<Reader/>}>

        </Route>

        <Route exact path='/admin/login' element={<AdminLogin/>}/>
        <Route exact path='/admin' element={<Admin/>}>
          <Route exact path='/admin/home' element={<AdminHome/>}/>
          <Route exact path='/admin/newpost' element={<AdminCreatePost/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
