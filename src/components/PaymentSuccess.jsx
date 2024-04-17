import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeAllCartAction } from "../redux/features/cartSlice";

const PaymentSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeAllCartAction());
    }, []);

    return (
        <div className="w-fit mx-auto text-center px-5 my-10 min-h-[50vh]">
            <div className="text-2xl mb-2 font-semibold">Thank you for your order.</div>
            <div className="mb-2">Your order will be processed shortly...</div>
            <div className="flex gap-2">
                <Link to="/profile/orders" className="px-5 py-1 border-2 border-gray rounded-md">
                    Your Order
                </Link>
                <Link to="/" className="px-5 py-1 border-2 border-gray rounded-md">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};
export default PaymentSuccess;
