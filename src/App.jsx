import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/Homepage";
import ProductList from "./pages/ProductList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import ShoppingCart from "./pages/ShoppingCart";
import Wishlist from "./pages/WishList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import Security from "./components/profile/Security";
import UserDetail from "./components/profile/UserDetail";
import Address from "./components/profile/Address";
import Orders from "./components/profile/Orders";
import AddressForm from "./components/AddressForm";
import CheckoutAddress from "./pages/CheckoutAddress";
import OrderDetail from "./pages/OrderDetail";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <ToastContainer
                position="bottom-center"
                autoClose={500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Slide
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/productlist/:category" element={<ProductList />} />
                <Route path="/product/:product_id" element={<SingleProduct />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/checkout/address" element={<CheckoutAddress />} />
                <Route path="/profile" element={<Profile />}>
                    <Route index element={<UserDetail />} />
                    <Route path="security" element={<Security />} />
                    <Route path="address" element={<Address />} />
                    <Route path="address/add" element={<AddressForm />} />
                    <Route path="orders" element={<Orders />} />
                </Route>
                <Route path="/order/:order_id" element={<OrderDetail />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/success" element={<PaymentSuccess />} />
                <Route path="/failed" element={<PaymentCancel />} />
                <Route path="/*" element={<div>Route does not exist</div>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
