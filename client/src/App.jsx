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
import Seed from './components/Headerlink/seed'
import Fertilizers from './components/Headerlink/Fertilizer'
import Buy from './components/Cart/Buy'
import SellerRegistration from './components/Admin/Sellerregistration'
import Sellerlogin from './components/Admin/Sellerlogin'
import Dashboard from './components/Admin/Dashboard'
import NearbySellers from './components/Headerlink/NearbySellers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      
      <Header />
      
      <Routes>
      <Route path="/Seed" element={<Seed />} />
      <Route path="/Fertilizers" element={<Fertilizers />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<DetailView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/SellerRegistration" element={<SellerRegistration/>}/>
        <Route path="/Sellerlogin" element={<Sellerlogin/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/NearbySellers" element={<NearbySellers />} />
        </Routes>
     </BrowserRouter>
  )
}

export default App

