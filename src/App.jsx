import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n";
import AboutUs from './pages/aboutUs/AboutUs';
import Cart from './pages/cart/Cart';
import Collection from './pages/collection/Collection';
import CreateAccount from './pages/createAccount/CreateAccount';
import Footer from './pages/footer/Footer';
import Gender from './pages/gender/Gender';
import Header from './pages/header/Header';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Product from './pages/product/Product';
import Search from './pages/search/Search';
import Category from './pages/category/Category';
import Wishlist from './pages/wishlist/Wishlist';
import UserPage from './pages/userPage/UserPage';
import Watches from './pages/watches/Watches';
import EmailVerification from './pages/emailVerification/EmailVerification';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProductId, setCurrentProductId] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('daily');
  const [currentGender, setCurrentGender] = useState('mensWatches');
  const [currentCollection, setCurrentCollection] = useState('eternalBeastsCollection');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [haveAccount, setHaveAccount] = useState(false);
  const [navigationState, setNavigationState] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Centralized navigation function
  const handleNavigate = (page, options = {}) => {
    const { productId, product, collectionId, categoryId, genderId, state } = options;
    if (page === 'cart') {
      if (product) {
        setCartItems((prev) => [...prev, product]);
      } else if (productId != null) {
        setCartItems((prev) => [...prev, { id: productId }]);
      }
      setIsCartOpen(true);
      return;
    }

    if (page === 'wishlist' && product) {
      setWishlistItems((prev) =>
        prev.some((item) => item.id === product.id) ? prev : [...prev, product]
      );
    }

    setCurrentPage(page);
    setNavigationState(state ?? null);
    if (page === 'category') {
      setCurrentCategory(categoryId);
    }
    if (page === 'gender') {
      setCurrentGender(genderId);
    }
    if (productId !== undefined && productId !== null) {
      setCurrentProductId(productId);
    }

    if (page === 'collection') {
      setCurrentCollection(collectionId);
    }
  };

  return (
    <>
      {currentPage !== 'search' && <Header onNavigate={handleNavigate} lang={lang} setLang={setLang} haveAccount={haveAccount} />}
      {currentPage === 'home' && <Home onNavigate={handleNavigate}/>}
      {currentPage === 'login' && <Login onNavigate={handleNavigate}/>}
      {currentPage === 'createAccount' && <CreateAccount onNavigate={handleNavigate}/>}
      {currentPage === 'userPage' && <UserPage onNavigate={handleNavigate} setHaveAccount={setHaveAccount}/>}
      {currentPage === 'emailVerification' && (
        <EmailVerification
          onNavigate={handleNavigate}
          signupData={navigationState?.signupData ?? null}
        />
      )}
      {currentPage === 'aboutUs' && <AboutUs />}
      {currentPage === 'search' && <Search onNavigate={handleNavigate}/>}
      {currentPage === 'category' && <Category id={currentCategory} onNavigate={handleNavigate} category={currentCategory}/>}
      {currentPage === 'gender' && <Gender id={currentGender} onNavigate={handleNavigate} gender={currentGender}/>}
      {currentPage === 'collection' && <Collection id={currentCollection} onNavigate={handleNavigate} collection={currentCollection}/>}
      {currentPage === 'wishlist' && <Wishlist onNavigate={handleNavigate} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />}
      {currentPage === 'product' && <Product id={currentProductId} onNavigate={handleNavigate} cartItems={cartItems} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />}
      {currentPage === 'watches' && <Watches onNavigate={handleNavigate}/>}
      {currentPage !== 'search' && <Footer />}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onNavigate={handleNavigate} cartItems={cartItems} setCartItems={setCartItems}/>
    </>
  );
}
