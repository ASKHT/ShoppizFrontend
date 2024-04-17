import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserOrdersApi } from "../../api/order.api";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const handleClick = (order_id) => {
        navigate(`/order/${order_id}`);
    };

    useEffect(() => {
        const getOrders = async () => {
            try {
                const orders = await getUserOrdersApi();
                setOrders(orders);
            } catch (error) {
                alert(error);
            }
        };
        getOrders();
    }, []);

    return (
        <div className="px-10 w-[70vw] ">
            <div className="text-2xl font-bold mb-5 w-full">Your Orders</div>
            <hr />
             <div className="flex flex-col">
            <div className="flex  h-14 bg-[#F8F8F8] items-center">
                 <div className="flex w-[40vw] justify-around">
                   <p >Order</p>
                  <p >Date</p>
                 </div>
                <div className="flex justify-around w-[35vw]">
                <p>Status</p>
               <p>Total</p>
               <p>Action</p>
                </div>
              
           </div>
           <div className="flex flex-col h-[20rem] justify-around">
                {orders && orders?.length>0? (
                    orders?.map((item)=>(
                        <div key={item.order_id} className="flex w-[65vw] justify-around text-justify border-b-2 border-gray py-4">
                        <p>#{item?.order_id}</p>
                        <p>{new Date(item?.createdAt).toLocaleDateString()}</p>
                        <p className={item?.status === "pending" ? "text-red-500" : "text-yellow-500"}>{item?.status}</p>
                        <p className="font-bold">&#8377;{item.total}</p>
                        <button className="px-6 py-2 rounded-lg text-white bg-black" onClick={() => handleClick(item.order_id)}>view</button>
                        </div>
                    ))
                ): ( <p className="text-center my-10">No Order Found</p>)
         }
           </div>
             </div>
          
        </div>
    );
};
export default Orders;
