import { useNavigate } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
export const Categories = () => {
    const navigate = useNavigate(null);

    const handleNavigation = (categoryName) => {
        navigate(`/productList/${categoryName}`);
    };

    return (
    <div className="w-[22rem] ml-24 border-2 border-l-gray h-[28rem]">
      <div className="flex items-center mb-2 bg-black text-white h-[5rem]  "> 
        <RiMenu3Line className="text-4xl left-3 ml-5" /> 
        <h1 className="text-xl font-bold p-5">Categories</h1>
      </div>
      <div className="h-[22rem] flex flex-col justify-between p-5 bg-[#F9F9F9] cursor-pointer">
        <p className="pb-1 border-b border-gray-400] " onClick={()=>handleNavigation("T-Shirts")}>T-Shirts</p>
        <p className="pb-1 border-b border-gray-400" onClick={()=>handleNavigation("Jacket")}>Jacket</p>
        <p className="pb-1 border-b border-gray-400" onClick={()=>handleNavigation("Jeans")}>Jeans</p>
        <p className="pb-1 border-b border-gray-400" onClick={()=>handleNavigation("Shirts")}>Shirts</p>
        <p className="pb-1 border-b border-gray-400" onClick={()=>handleNavigation("Trackpants")}>Trackpants</p>
        <p  onClick={()=>handleNavigation("Sweatshirt")}>Sweatshirt</p>
      </div>
    </div>
    );
};
