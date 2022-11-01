import './App.css';
import {Routes, Route} from 'react-router-dom';

import Reader from './components/Reader';
import Admin from './components/Admin';
import AdminLogin from './components/AdminComponents/AdminLogin/AdminLogin';

function App() {

  return (
    <>

      <Routes>
        <Route path="/reader" element={<Reader/>}>

        </Route>

        <Route exact path='/admin/login' element={<AdminLogin/>}/>
        <Route exact path='/admin' element={<Admin/>}>
        </Route>
      </Routes>
    </>
  )
}

export default App
