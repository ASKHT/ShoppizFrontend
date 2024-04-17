import productImg from "../assets/productImg1.jpg";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWishList } from "../features/wishListSlice";
import { addwishListAction } from "../redux/features/wishListSlice";
import { toast } from "react-toastify";
import { MdOutlineRemoveRedEye } from "react-icons/md";
export const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.data);

    const handleClick = () => {
        if (item?.quantity < 1) {
            toast.error("Out of stock");
        } else {
            navigate(`/product/${item._id}`);
        }
    };
    const handleWishlist = async (e) => {
        e.stopPropagation();
        dispatch(addwishListAction({ product_id: item._id }));
    };

    return (
        <div
            className={`${
                item?.quantity < 1 ? "cursor-not-allowed opacity-40" : "cursor-mouse"
            } rounded-md overflow-hidden shadow-lg shadow-slate-400 m-2 border-2 border-l-gray`}
           
        >
            <div
                className={`${
                    item?.quantity < 1 ? "text-red-500 text-center opacity-100" : "hidden"
                } text-red-500 text-center opacity-100`}
            >
                Out of Stock
            </div>
            <div className="flex justify-center">
                 <img src={item?.image} alt="" className="w-[80%] h-[250px] object-contain " />
            </div>
            <div className="px-5 text-center space-y-2 flex justify-between">
                <div className="flex flex-col gap-2 items-center justify-center">
              <div className="text-ellipsis line-clamp-2 text-sm text-darkGray font-medium ">{item.name}</div>
                   <div className="flex gap-2">
                     <div className="bg-black text-white rounded-sm px-2 py-1 text-xs font-bold">
                        {item.averageRating} &#9733; | {item.numOfReview}
                    </div>
                    <FaHeart
                        className={`${
                            wishlist && wishlist.includes(item._id) ? "text-pink-600" : "text-gray"
                        } cursor-pointer text-xl`}
                        onClick={handleWishlist}
                    />
                   </div>
                <div className="text-md font-bold"> &#8377; {item.price}</div>
                </div>
                <div className="w-10 h-8  items-center border-2 border-slate-200 shadow-md text-center flex justify-center  ">
                   <MdOutlineRemoveRedEye className="cursor-pointer text-black text-2xl font-bold "
                       onClick={handleClick}
                   />
                </div>
            </div>
        </div>
    );
};
