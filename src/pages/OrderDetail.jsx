import { useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { useParams } from "react-router-dom";
import { getSingleOrderApi } from "../api/order.api";
import ReviewModal from "../components/ReviewModal";

const OrderDetail = () => {
    const { order_id } = useParams();
    const [orderDetail, setOrderDetail] = useState();
    const [showReviewModal, setShowReviewModal] = useState(false);

    useEffect(() => {
        const getOrderDetail = async () => {
            try {
                const orders = await getSingleOrderApi(order_id);
                setOrderDetail(orders);
                // console.log(orders)
            } catch (error) {
                alert(error);
            }
        };
        getOrderDetail();
    }, [order_id]);

    return (
        <div className="my-10">
            <ContentWrapper>
                <div className="text-2xl font-bold">Order Detail</div>
                <hr />
                <div className="text-sm my-2">
                    <div className="flex gap-10 mb-1">
                        <div className="">Order ID</div>
                        <div className="font-semibold">{orderDetail?.order_id}</div>
                    </div>
                    <div className="flex gap-10">
                        <div className="px-4">Date</div>
                        <div className="font-semibold">
                            {new Date(orderDetail?.createdAt).toLocaleDateString("en-us", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </div>
                    </div>
                </div>

                <div className="text-2xl font-bold mt-5"><p>Order Items</p>
                <hr />
                <div className="flex gap-5 my-5">
                    <div className="w-full">
                        {orderDetail?.cartItems &&
                            orderDetail?.cartItems?.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex gap-10 overflow-hidden rounded-lg p-2 mb-5 border-2 border-slate-200"
                                >
                                    <img
                                        src={item?.image}
                                        alt=""
                                        className="w-[100px] h-[100px] object-contain border-2 "
                                    />
                                    <div className="flex justify-between items-center w-full text-[16px] text-darkGray ">
                                        <div className="">{item.name}</div>
                                        <div className="">
                                            <div className="font-bold">Quantity</div>
                                            <div className="text-center">{item.quantity}</div>
                                        </div>
                                        <div className="">
                                            <div className="font-bold">Total Amount </div>
                                            <div className="text-center">&#8377;{item.price}</div>
                                        </div>
                                        <div className="">
                                            <div className="font-bold">Order Status</div>
                                            <div className="text-center">{orderDetail?.status}</div>
                                        </div>
                                        <button
                                            className="bg-black text-white rounded-lg p-1"
                                            onClick={() => setShowReviewModal(true)}
                                        >
                                            Add Review
                                        </button>
                                        {showReviewModal && <ReviewModal setShowReviewModal={setShowReviewModal} productId={item.product}/>}
                                    </div>
                                </div>
                            ))}
                    </div>
                   </div>
                    <div className="w-[28rem]">
                        <div className="bg-white border-2 border-slate-900 text-black p-5 rounded-sm ">
                            <div className="text-lg border-b-2 border-black py-4">Order Summary</div>
                            <div className="flex justify-between  my-2 py-5">
                                <div className="text-lg">SubTotal</div>
                                <div className="text-lg">{(orderDetail?.total - orderDetail?.shippingFee).toString()}</div>
                            </div>
                            <div className="flex justify-between  my-2 py-5">
                                <div className="text-lg">Shipping Fee</div>
                                <div className="text-lg">{orderDetail?.shippingFee}</div>
                            </div>
                            <div className="flex justify-between my-2 py-5">
                                <div className="text-lg">Order Total</div>
                                <div className="text-lg">{orderDetail?.total}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};
export default OrderDetail;
