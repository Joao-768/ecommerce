import React, { useState } from 'react';
import "./i18n";
import AboutUs from './pages/aboutUs/AboutUs';
import Cart from './pages/cart/Cart';
import Collection from './pages/collection/Collection';
import CreateAccount from './pages/createAccount/CreateAccount';
import Footer from './ui/Footer';
import Header from './ui/header/Header';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Product from './pages/product/Product';
import Search from './pages/search/Search';
import Style from './pages/categories/Categories';
import Wishlist from './pages/wishlist/Wishlist';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProductId, setCurrentProductId] = useState(1);
  const [currentStyle, setCurrentStyle] = useState('daily');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const pagesWithoutFooter = ['search', 'collection', 'style'];
  const shouldShowChrome = !pagesWithoutFooter.includes(currentPage);

  const handleNavigate = (page, productId) => {
    if (page === 'cart') {
      setIsCartOpen(true);
      return;
    }

    setCurrentPage(page);
    if (page === 'style' && typeof productId === 'string') {
      setCurrentStyle(productId);
    }
    if (productId !== undefined && productId !== null) {
      setCurrentProductId(productId);
    }
  };

  return (
    <>
      {currentPage !== 'search' && <Header onNavigate={handleNavigate} lang={lang} setLang={setLang}/>}
      {currentPage === 'home' && <Home onNavigate={handleNavigate}/>}
      {currentPage === 'login' && <Login onNavigate={handleNavigate}/>}
      {currentPage === 'createAccount' && <CreateAccount onNavigate={handleNavigate}/>}
      {currentPage === 'aboutUs' && <AboutUs />}
      {currentPage === 'search' && <Search onNavigate={handleNavigate}/>}
      {currentPage === 'style' && <Style onNavigate={handleNavigate} style={currentStyle}/>}
      {currentPage === 'collection' && <Collection onNavigate={handleNavigate}/>}
      {currentPage === 'wishlist' && <Wishlist onNavigate={handleNavigate}/>}
      {currentPage === 'product' && <Product id={currentProductId} onNavigate={handleNavigate} />}
      {shouldShowChrome && <Footer />}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
