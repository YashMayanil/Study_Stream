import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { Router,Route } from 'react-router-dom'


const App = () => {
  return (
    <Router>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
    </Router>
  )
}

export default App
