import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productImg1 from "../assets/productImg1.jpg";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ContentWrapper from "../components/ContentWrapper";
import { getCartAction, removeCartAction } from "../redux/features/cartSlice";

const ShoppingCart = () => {
    const dispatch = useDispatch();
    let cartData = useSelector((state) => state.cart);
    const cartProducts = cartData?.data?.cartItems;

    const handleRemove = async (product_id) => {
        await dispatch(removeCartAction(product_id));
        await dispatch(getCartAction());
    };

    const handleOrderToLocalStorage = () => {
        localStorage.setItem("ecommerce-order", JSON.stringify(cartData.data));
    };

    useEffect(() => {
        dispatch(getCartAction());
    }, [dispatch]);

    return (
        <ContentWrapper>
            <div className="text-3xl font-semibold my-10 ">Shopping Cart</div>
            {cartData?.loading ? (
                <div className="">Loading...</div>
            ) : (
               <div className="flex flex-col gap-10 pb-6">
                 <div className="flex w-[80vw] justify-around bg-[#F8F8F8] h-16 items-center ">
                    <div className="pl-80">
                        <p className="font-bold">Product</p>
                    </div>
                   <div className="flex w-[52rem] justify-around pl-56">
                        <p className="font-bold">Price</p>
                         <p className="font-bold">Quantity</p>
                    <div>
                        <p className="font-bold">Subtotal</p>
                    </div>
                   </div>
                </div>
              {cartProducts && cartProducts.map((item)=>(
                  <div className="flex w-[80vw] justify-around items-center pr-3"  key={item.product._id}>
                    <div className="w-8 h-8 rounded-[50%] border-2 border-black flex justify-center">
                      <button><p className="text-xl font-bold"  onClick={() => handleRemove(item.product._id)}>X</p></button>
                    </div>
                    <div>
                          <img
                             src={item?.product.image}
                             alt=""
                            className="w-[200px] h-[200px] object-contain border-2 "
                          />

                    </div>
                    <div>
                        <p>{item.product.price}</p>
                    </div>
                    <div>
                        <p>{item.quantity}</p>
                    </div>
                    <div>
                        <p>{item.totalPrice}</p>
                    </div>
                </div>
              ))}
              <div className="flex justify-end">
                <div className="bg-white text-slate-600 w-[50%] p-5 rounded-md border-2 border-slate-200 shadow-xl shadow-slate-200">
                        <div className="flex justify-between border-b-2 border-black my-2 py-5">
                            <div className="">SubTotal</div>
                            <div className="">{cartData?.data?.cartTotal}</div>
                        </div>
                        <div className="flex justify-between border-b-2 border-black my-2 py-5">
                            <div className="">Shipping Fee</div>
                            <div className="">100</div>
                        </div>
                        <div className="flex justify-between my-2 py-5">
                            <div className="">Order Total</div>
                            <div className="">{(cartData?.data?.cartTotal + 100).toString()}</div>
                        </div>
                        <Link to="/checkout/address" onClick={handleOrderToLocalStorage}>
                            <button className="bg-black text-white w-[100%] rounded-lg px-4 py-2">
                                Place Order
                            </button>
                        </Link>
                       
                    </div>

              </div>
               </div>
                
            )}
        </ContentWrapper>
    );
};

export default ShoppingCart;
