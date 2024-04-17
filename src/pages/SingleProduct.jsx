import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  FaHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import productImg1 from "../assets/productImg1.jpg";
import ContentWrapper from "../components/ContentWrapper";

import { getSingleProductAction } from "../redux/features/productSlice";
import { addwishListAction } from "../redux/features/wishListSlice";
import { addToCartAction } from "../redux/features/cartSlice";
import { getSingleProductReviews } from "../api/review.api";

const SingleProduct = () => {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const dispatch = useDispatch();
    const { singleProduct, loading, error } = useSelector((state) => state.product);
    const cartItem = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const wishList = useSelector((state) => state.wishlist);
    const [productReviews, setProductReviews] = useState([]);

    const proudctViewImages = [
        productImg1,
        "https://rukminim2.flixcart.com/image/128/128/xif0q/mobile/i/s/l/-original-imagx24fmpdfnuwh.jpeg?q=70&crop=false",
        "https://rukminim2.flixcart.com/image/128/128/xif0q/mobile/g/y/m/-original-imagx24ff2bwmdpm.jpeg?q=70&crop=false",
        "https://www.reliancedigital.in/medias/Horizon-Forbidden-West-Std-PS4-492519960-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wzNTMwMnxpbWFnZS9qcGVnfGltYWdlcy9oZTYvaDVjLzk3NDE0Mjk1NzE2MTQuanBnfDMxZTQ0NjI1NWZiYzU3YWFkMTU0ODRkMzZhOTNlYjNjYjY5MDBkYWViMWQ4NjExNTg3N2E2MTY0ZDMzMTI3MTc",
    ];

    const [currentSliderView, setcurrentSliderView] = useState(0);

    // const handleSlideLeft = () => {
    //     setcurrentSliderView((prev) => (prev - total + 150) % total);
    //     console.log(currentSliderView, total);
    // };

    // const handleSlideRight = () => {
    //     setcurrentSliderView((prev) => (prev - 150) % total);
    //     console.log(currentSliderView, total);
    // };
    const total = (proudctViewImages.length - 2) * 150;

    const color = ["#53f374", "#23ad63", "#fff383"];
    const date = new Date();
    const ratings = [1, 2, 3, 4, 5, 6];

    const [quantity, setQuantity] = useState(1);
    const [present, setPresent] = useState(false);

    const handleWishlist = async () => {
        auth.data ? dispatch(addwishListAction({ product_id })) : navigate("/login");
    };

    const handleCart = () => {
        dispatch(addToCartAction({ product_id, quantity }));
    };

    const checkProdcutPresentInCart = () => {
        let idx = cartItem?.data?.cartItems?.findIndex((item) => item.product === product_id);
        idx > -1 ? setPresent(true) : setPresent(false);
    };
    useEffect(() => {
        checkProdcutPresentInCart();
    }, [cartItem]);

    // get single product details
    useEffect(() => {
        dispatch(getSingleProductAction(product_id));
    }, []);

    useEffect(() => {
        getSingleProductReviews(product_id)
            .then((res) => {
                console.log(res);
                setProductReviews(res.productReviews);
            })
            .catch((error) => {
                toast.error(error);
            });
    }, []);

    return (
        <>
            {loading ? (
                <div className="">Loading....</div>
            ) : (
                <ContentWrapper >
                    <div className="flex mt-10 gap-7">
                        <div className="w-[40%]">
                            <div className="w-[400px] h-[400px] mx-auto border-2 border-gray items-center flex justify-center bg-red-200 ">
                                <img src={singleProduct?.image} alt="" className="w-[100%] h-[100%]" />
                            </div>
                        </div>

                        <div className="p-5 my-5 space-y-5 text-darkGray">
                            <div className="text-2xl font-bold">{singleProduct?.name}</div>
                            <div className="text-gray flex gap-1 items-center">
                                <span className="text-black font-bold">Average rating:</span>
                                <span className="text-black font-bold">{singleProduct?.averageRating}</span>
                                <div className="flex">
                                    {(() => {
                                        const stars = [];
                                        for (let i = 0; i < singleProduct?.averageRating; i++) {
                                        stars.push(<FaStar key={i} className="fill-yellow-300" />);
                                        }
                                        return stars;
                                    })()}
                                    </div>
                               
                            </div>
                            <div className="text-2xl">
                                <span className="font-bold text-sm">Price : </span>
                                &#8377;{singleProduct?.price}
                            </div>
                            <div className="text-justify text-sm">
                                <span className="font-bold">Description : </span>
                                {singleProduct?.description}
                            </div>
                           
                            <div className="flex w-full gap-6 ">
                                <div className="flex items-center gap-3">
                                <span className="font-bold">Add to Wishlist : </span>
                                <FaHeart
                                    className={`text-gray cursor-pointer text-2xl ${
                                        auth.data &&
                                        wishList.data &&
                                        (wishList.data.includes(product_id) ? "text-pink-600" : "text-gray")
                                    }`}
                                    onClick={handleWishlist}
                                />
                           

                             <div className="flex gap-2 items-center">
                                <span className="font-bold">Quantity : </span>
                                <div className="flex h-10 bg-white rounded-lg text-2xl border-2 border-black">
                                    <div
                                        className="cursor-pointer flex justify-center items-center w-8 active:text-blue-300 select-none border-r-2 border-black"
                                        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                    >
                                        -
                                    </div>
                                    <div className=" flex justify-center items-center w-20">{quantity}</div>
                                    <div
                                        className="cursor-pointer flex justify-center items-center w-8 active:text-primaryGreen select-none border-l-2 border-black"
                                        onClick={() => setQuantity(quantity < 10 ? quantity + 1 : 10)}
                                    >
                                        +
                                    </div>
                                </div>
                             </div>
                           
                             <div>
                                {present ? (
                                    <button
                                        className="bg-black text-white font-bold px-10 py-2 rounded-xl w-[100%] cursor-pointer active:bg-blue-600"
                                        onClick={() => navigate("/cart")}
                                    >
                                        Go To Cart{" "}
                                    </button>
                                ) : (
                                    <button
                                        className="bg-black text-white font-bold px-10 py-2 rounded-xl w-[100%] cursor-pointer active:bg-pink-300"
                                        onClick={handleCart}
                                    >
                                        Add To Cart
                                    </button>
                                )}

                             
                             </div>
                          </div>
                          </div>

                            <div className="border-2 border-slate-100 shadow-slate-300 items-center p-3 shadow-xl">
                                <div className="font-semibold text-2xl my-5"> Reviews</div>
                               <div className="">
                                    {productReviews.length > 0 ? (
                                        productReviews.map((rating, idx) => (
                                        <div key={idx}>
                                            <span className="bg-black text-white rounded-md px-2 mr-5">
                                            {rating?.rating} &#9733;
                                            </span>
                                            <span className="">{rating?.comment}</span>
                                            <div className="font-semibold">
                                            {rating?.user?.name}| {" "} posted on:{" "}
                                            {new Date(rating?.createdAt).toLocaleDateString("en-us", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                            </div>
                                        </div>
                                        ))
                                    ) : (
                                        <div>No reviews yet.</div>
                                    )}
                                 </div>
                            </div>
                        </div>
                    </div>


                </ContentWrapper>
            )}
        </>
    );
};

export default SingleProduct;
