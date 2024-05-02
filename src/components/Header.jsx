import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaUser, FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import ContentWrapper from "./ContentWrapper";
import { Categories } from "./Categories";
import { logout } from "../redux/features/authSlice";
import { getCartAction } from "../redux/features/cartSlice";
// import sitelogo from "../assets/banner-img/logoofcompany.jpg"
import { BsCart3 } from "react-icons/bs";
const Header = () => {
    let quantity = 0;
    const { data } = useSelector((state) => state.auth);
    const cartItem = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);

    const handleLogout = async () => {
        dispatch(logout());
    };

    useEffect(() => {
        dispatch(getCartAction());
    }, [dispatch]);

    return (
        <div className="bg-white p-2">
            {showCategoryMenu && <Categories setShowCategoryMenu={setShowCategoryMenu} />}
            <ContentWrapper>
                <div className="flex justify-between items-center py-2">
                    <div className="text-[black] flex gap-5 items-center text-3xl font-bold cursor-pointer">
                    
                        <Link to="/">
                         <h1 className="text-4xl font-serif font-extrabold ">Shoppizz</h1>
                        </Link>
                    </div>
                    <div className="flex basis-[50%] items-center bg-white border-2 border-[black] p-1 rounded-[10px]">
                        <input
                            type="text"
                            placeholder="Currently search bar is not working all other features are working?"
                            className="w-full px-3 outline-none"
                        />
                        <FaSearch className="text-4xl px-2" />
                    </div>
                    {data ? (
                        <div className="flex items-center gap-8 ">
                            <Link to="/profile">
                                <AiOutlineUser className="text-3xl cursor-pointer fill-black" />
                            </Link>
                            <Link to="/wishlist">
                                <FaRegHeart className="text-3xl cursor-pointer 
                               fill-wishlist" />
                            </Link>
                            <div className="relative">
                                <Link to="/cart">
                                    <BsCart3  className="text-3xl cursor-pointer fill-black" />
                                </Link>
                                {cartItem &&
                                    cartItem?.data?.cartItems?.forEach((item) => {
                                        quantity += item.quantity;
                                    })}
                                {quantity > 0 && (
                                    <div className="absolute bottom-4 left-3 flex justify-center items-center  w-3 h-3 rounded-full bg-black text-white  p-3 text-sm font-bold">
                                        {quantity}
                                    </div>
                                )}
                            </div>
                            <button
                                className="bg-red-400 px-5 py-2 rounded-xl font-semibold text-white cursor"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-5 ">
                            <Link to="/login">
                                <FaUser className="text-2xl cursor-pointer" />
                            </Link>
                            <Link to="/login">
                                <FaRegHeart className="text-2xl cursor-pointer" />
                            </Link>
                            <Link to="/login">
                                <FaCartShopping className="text-2xl cursor-pointer" />
                            </Link>

                            <button className="bg-red-400 px-5 py-2  font-semibold text-white cursor rounded-xl">
                                <Link to="/login">Login</Link>
                            </button>
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Header;
