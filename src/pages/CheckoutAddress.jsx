import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";
import ContentWrapper from "../components/ContentWrapper";
import { getAddressApi } from "../api/address.api";
import { BASE_URL } from "../constants/constant";
const CheckoutAddress = () => {
    let cartData = useSelector((state) => state.cart);
    // console.log(cartData?.data?.cartItems.length<1?console.log("bad error"):console.log("all set"));
    const {name}=JSON.parse(localStorage.getItem("ecommerce-user"))
    // console.log(name)
    const navigate = useNavigate();
    const [address, setAddress] = useState();
    const [shippingAddress, setShippingAddress] = useState();

    useEffect(() => {
        const getAddress = async () => {
            try {
                const { address } = await getAddressApi();
                // console.log(address);
                setAddress(address);
            } catch (error) {
                alert(error);
            }
        };
        getAddress();
    }, []);

    // payment integration
    const CheckoutHandler = async () => {
        if(cartData?.data?.cartItems.length<1){
            return alert("your shopping cart is empty")
        }
        const body = {
            products: cartData?.data?.cartItems,
        };
        const {
            data: { order },
        } = await axios.post(`${BASE_URL}/api/v1/payment/checkout`, cartData.data);

        const options = {
            key: "rzp_test_iZCY07ZM7DSPae",
            amount: "50000",
            currency: "INR",
            name: "Digicart",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            callback_url:` ${BASE_URL}/api/v1/payment/verification`,
            prefill: {
                name: name,
                email: "test@example.com",
                contact: "9000090000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#000000",
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <ContentWrapper>
            {cartData?.loading ? (
                <div className="">Loading...</div>
            ) : (
                <div className="flex justify-between items-start my-10  gap-10 ">
                    <div className="w-[40vw]">
                        <div className="flex justify-between mb-5">
                            <div className="text-2xl ">Select Delivery Address</div>
                            <button
                                className="border-2 border-gray rounded-md px-5 py-2"
                                onClick={() => navigate("/profile/address/add")}
                            >
                                Add Address
                            </button>
                        </div>
                        {address &&
                            address.map((item) => (
                                <div key={item._id} className="flex gap-5 rounded-lg p-2 mb-5 bg-white border-2 border-slate-100 shadow-lg shadow-slate-200">
                                    <input
                                        type="radio"
                                        name="address"
                                        id=""
                                        className=""
                                        onChange={() => setShippingAddress(item)}
                                    />
                                    <div className="">
                                        <div className="font-semibold mb-2">{item.user.name}</div>
                                        <div className="flex items-center gap-2">
                                            <FaHome />
                                            <div className="">{item.street}, </div>
                                            <div className="">{item.city}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="">{item.state}, </div>
                                            <div className="">{item.country}</div>
                                            <div className="">- {item.zipcode}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                                    <div className="w-[26rem] h-[9rem] border-2 border-black text white flex flex-col justify-around  px-4 rounded-lg">
                                          <div className="flex justify-center text-xl font-bold">Test Card</div>
                                         <div className="flex gap-5 ">
                                             <p className="text-lg font-bold">Test Card No:</p>
                                             <p>5267 3181 8797 5449</p>
                                         </div>
                                         <div className="flex gap-5 ">
                                             <p className="text-lg font-bold">Test Card CVV:</p>
                                             <p>253</p>
                                         </div>
                                         
                                         <div className="flex gap-5 ">
                                           <p className="text-md font-bold">Maximum payment allowed:</p>
                                             <p>30000Rs</p>
                                         </div>
                                         
                                    </div>
                    </div>

                    <div className="bg-white text-slate-600 w-[40%] p-5 rounded-lg">
                        <div className="flex justify-between border-b-2 border-gray my-2 py-5">
                            <div className="">SubTotal</div>
                            <div className="">{cartData?.data?.cartTotal}</div>
                        </div>
                        <div className="flex justify-between border-b-2 border-gray my-2 py-5">
                            <div className="">Shipping Fee</div>
                            <div className="">100</div>
                        </div>
                        <div className="flex justify-between my-2 py-5">
                            <div className="">Order Total</div>
                            <div className="">{(cartData?.data?.cartTotal + 100).toString()}</div>
                        </div>

                        <button
                            className="bg-black text-white w-[100%] rounded-md px-4 py-2"
                            onClick={() => (shippingAddress ? CheckoutHandler() : alert("Select Address"))}
                        >
                        Proceed to Pay<span className="text-bold text-lg">{">>"}</span>
                        </button>
                    </div>
                </div>
            )}
        </ContentWrapper>
    );
};

export default CheckoutAddress;
