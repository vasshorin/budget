import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Expenses from '../expenses/Expenses'
import Login from '../login/Login'
import Register from '../register/Register'
import Main from '../main/Main'

const Navbar = () => (
  <>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/expenses">Expenses</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
    </ul>
  </nav>

  <Routes>
    <Route path='/' element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/expenses" element={<Expenses />} />
    <Route path='/register' element={Register} />
  </Routes>
  </>
);

export default Navbar;
