import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddStore from './pages/AddStore'
import Register from './pages/Register'
import Updatepassword from './pages/Updatepassword'

function App() {

  //login
  //dashboard

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={< Dashboard/>}/>
      <Route path='/addstore' element={< AddStore/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/update' element={<Updatepassword/>}/>
    </Routes>

    </>
  )
}

export default App
