import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DetailView from './components/Details/Detailview'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<DetailView />} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>
      <Footer/>
     
    </BrowserRouter>
  )
}

export default App

