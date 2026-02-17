import React, { useState } from 'react';
import './App.css';
import Header from './ui/header/Header';
import Footer from './ui/footer/Footer';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <Header onNavigate={setCurrentPage} />
      {currentPage === 'home' && <Home />}
      {currentPage === 'login' && <Login />}
      <Footer />
    </>
  );
}
