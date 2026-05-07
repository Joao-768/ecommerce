import "./i18n";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';

// Layout
import Header from './pages/header/Header';
import Footer from './pages/footer/Footer';
import UserPage from './pages/userPage/UserPage';

// Public
import Home from './pages/home/Home';
import AboutUs from './pages/aboutUs/AboutUs';
import Login from './pages/login/Login';
import CreateAccount from './pages/createAccount/CreateAccount';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';

// Shop
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import Category from './pages/category/Category';
import Product from './pages/product/Product';
import Search from './pages/search/Search';
import Watches from './pages/watches/Watches';
import Wishlist from './pages/wishlist/Wishlist';
import Collection from './pages/collection/Collection';
import Gender from './pages/gender/Gender';

// Admin
import Admin from './pages/admin/Admin';

import Dashboard from "./pages/admin/components/dashboard/Dashboard";
import AddTask from "./pages/admin/components/dashboard/AddTask";
import EditTask from "./pages/admin/components/dashboard/EditTask";

import CollectionManagement from "./pages/admin/components/collectionManagement/CollectionManagement"; 
import AddCollection from "./pages/admin/components/collectionManagement/addCollection";
import EditCollection from "./pages/admin/components/collectionManagement/EditCollection";
import ProductsCollection from "./pages/admin/components/collectionManagement/ProductsCollection";

import OrdersManagement from "./pages/admin/components/orderManagement/OrderManagement";
import EditOrder from "./pages/admin/components/orderManagement/EditOrder";

import ProductManagement from "./pages/admin/components/productManagement/ProductManagement";
import AddProduct from "./pages/admin/components/productManagement/AddProduct";
import EditProduct from "./pages/admin/components/productManagement/EditProduct";

import UserManagement from "./pages/admin/components/userManagement/UserManagement";
import AddUser from "./pages/admin/components/userManagement/AddUser";
import EditUser from "./pages/admin/components/userManagement/EditUser";

// User pages
import UserControlPanel from "./pages/userPage/components/UserControlPanel";
import UserCollection from "./pages/userPage/components/userCollection/UserCollection";
import UserCollectionAdd from "./pages/userPage/components/userCollection/UserCollectionAdd";

import UserOrders from "./pages/userPage/components/userOrders/UserOrders";
import AddOrder from "./pages/userPage/components/userOrders/ViewOrder";

import UserPreferences from "./pages/userPage/components/userPreferences";

import UserInfo from "./pages/userPage/components/userPersonalInfo/UserInfoView";
import AddAddress from "./pages/userPage/components/userPersonalInfo/AddAddress";
import EditAddress from "./pages/userPage/components/userPersonalInfo/EditAddress";
import ChangePassword from "./pages/userPage/components/userPersonalInfo/ChangePassword";

export default function App() {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const location = useLocation();

    const hideLayout = location.pathname === "/search";

    return (
        <>
            {!hideLayout && <Header setCartIsOpen={setCartIsOpen} />}

            <Routes>

                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Shop */}
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/product/:id" element={<Product setCartIsOpen={setCartIsOpen} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watches" element={<Watches />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/collection/:id" element={<Collection />} />
                <Route path="/gender/:id" element={<Gender />} />

                {/* Admin */}
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />

                    {/* Dashboard */}
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="task/:id/edit" element={<EditTask />} />
                    <Route path="task/add" element={<AddTask />} />

                    {/* Collection Management */}
                    <Route path="collection-management">
                        <Route index element={<CollectionManagement />} />
                        <Route path="add" element={<AddCollection />} />
                        <Route path=":id/edit" element={<EditCollection />} />
                        <Route path=":id/products" element={<ProductsCollection />} />
                    </Route>

                    {/* Order Management */}
                    <Route path="order-management">
                        <Route index element={<OrdersManagement />} />
                        <Route path=":id/edit" element={<EditOrder />} />
                    </Route>

                    {/* Product Management */}
                    <Route path="product-management">
                        <Route index element={<ProductManagement />} />
                        <Route path="add" element={<AddProduct />} />
                        <Route path=":id/edit" element={<EditProduct />} />
                    </Route>

                    {/* User Management */}
                    <Route path="user-management">
                        <Route index element={<UserManagement />} />
                        <Route path="add" element={<AddUser />} />
                        <Route path=":id/edit" element={<EditUser />} />
                    </Route>
                </Route>

                {/* User */}
                <Route path="/user-page/*" element={<UserPage />}>
                    
                    <Route index element={<UserControlPanel />} />

                    <Route path="control-panel" element={<UserControlPanel />} />

                    {/* Collection */}
                    <Route path="collection" element={<UserCollection />} />
                    <Route path="collection/add" element={<UserCollectionAdd />} />

                    {/* Orders */}
                    <Route path="orders">
                        <Route index element={<UserOrders />} />
                        <Route path=":id/view" element={<AddOrder />} />
                    </Route>

                    {/* Preferences */}
                    <Route path="preferences" element={<UserPreferences />} />

                    {/* Personal Info */}
                    <Route path="personal-info">
                        <Route index element={<UserInfo />} />
                        <Route path="add" element={<AddAddress />} />
                        <Route path=":id/edit" element={<EditAddress />} />
                        <Route path="password" element={<ChangePassword />} />
                    </Route>

                </Route>

            </Routes>

            <Cart 
                isOpen={cartIsOpen} 
                onClose={() => setCartIsOpen(false)} 
            />

            {!hideLayout && <Footer />}
        </>
    );
}