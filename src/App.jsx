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
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import Search from './pages/search/Search';
import Watches from './pages/watches/Watches';
import Wishlist from './pages/wishlist/Wishlist';

// Admin
import Admin from './pages/admin/Admin';

import Dashboard from "./pages/admin/components/dashboard/Dashboard";
import Task from "./pages/admin/components/dashboard/Alerts/Task";
import AddTask from "./pages/admin/components/dashboard/Alerts/AddTask";
import EditTask from "./pages/admin/components/dashboard/Alerts/EditTask";

import CollectionManagement from "./pages/admin/components/collectionManagement/CollectionManagement"; 
import AddCollection from "./pages/admin/components/collectionManagement/AddCollection";
import EditCollection from "./pages/admin/components/collectionManagement/EditCollection";
import ProductsCollection from "./pages/admin/components/collectionManagement/ProductsCollection";

import OrdersManagement from "./pages/admin/components/orderManagement/OrderManagement";
import EditOrder from "./pages/admin/components/orderManagement/EditOrder";

import ProductManagement from "./pages/admin/components/productManagement/ProductManagement";
import AddProduct from "./pages/admin/components/productManagement/addProduct/AddProduct";
import EditProduct from "./pages/admin/components/productManagement/editProduct/EditProduct";

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

// Not Found
import NotFound from "./pages/notFound/NotFound";

export default function App() {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const location = useLocation();

    const hideLayout = location.pathname === "/about-us";

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
                <Route path="/category/:id" element={<ProductList type="category" />} />
                <Route path="/collection/:id" element={<ProductList type="collection" />} />
                <Route path="/gender/:id" element={<ProductList type="gender" />} />
                <Route path="/product/:id" element={<Product cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watches" element={<Watches />} />
                <Route path="/wishlist" element={<Wishlist />} />

                {/* Admin */}
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="task/:id" element={<Task />} />
                    <Route path="task/:id/edit" element={<EditTask />} />
                    <Route path="task/add" element={<AddTask />} />

                    <Route path="collection-management">
                        <Route index element={<CollectionManagement />} />
                        <Route path="add" element={<AddCollection />} />
                        <Route path=":id/edit" element={<EditCollection />} />
                        <Route path=":id/products" element={<ProductsCollection />} />
                    </Route>

                    <Route path="order-management">
                        <Route index element={<OrdersManagement />} />
                        <Route path=":id/edit" element={<EditOrder />} />
                    </Route>

                    <Route path="product-management">
                        <Route index element={<ProductManagement />} />
                        <Route path="add" element={<AddProduct />} />
                        <Route path=":id/edit" element={<EditProduct />} />
                    </Route>

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

                    <Route path="collection" element={<UserCollection />} />
                    <Route path="collection/add" element={<UserCollectionAdd />} />

                    <Route path="orders">
                        <Route index element={<UserOrders />} />
                        <Route path=":id/view" element={<AddOrder />} />
                    </Route>

                    <Route path="preferences" element={<UserPreferences />} />

                    <Route path="personal-info">
                        <Route index element={<UserInfo />} />
                        <Route path="add" element={<AddAddress />} />
                        <Route path=":id/edit" element={<EditAddress />} />
                        <Route path="password" element={<ChangePassword />} />
                    </Route>
                </Route>

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />

            </Routes>

            <Cart 
                isOpen={cartIsOpen} 
                onClose={() => setCartIsOpen(false)}
            />

            {!hideLayout && <Footer />}
        </>
    );
}
