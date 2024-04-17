import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Profile = () => {
    const [active, setActive] = useState(1);

    const handleClick = (id) => {
        setActive(id);
    };
    
    return (
        <div className="flex  max-w-[1300px] min-h-[50vh] mx-auto my-10 ">
            <div className="basis-[20%] border-2 border-[rgba(230,230,217,0.97)] flex flex-col gap-6 h-[18rem]">
                <div className={`px-5 py-5  ${active === 1 ? "bg-black text-white " : ""}`}>
                    <Link to={""} onClick={() => handleClick(1)} >
                        Account Details
                    </Link>
                </div>
                <div className={`px-5 py-3 pb-0 border-b-2 border-slate-300 ${active === 2 ? "bg-black text-white h-full " : " "}`}>
                    <Link to={"security"} onClick={() => handleClick(2)}  >
                        Account Security
                    </Link>
                </div>
                <div className={`px-5 py-2  border-b border-slate-300 ${active === 3 ? "bg-black text-white h-full " : ""}`}>
                    <Link to={"address"} onClick={() => handleClick(3)}>
                        Address
                    </Link>
                </div>
                <div className={`px-5 py-2 ${active === 4 ? "bg-black text-white h-full  " : ""}`}>
                    <Link to={"orders"} onClick={() => handleClick(4)}>
                        Orders
                    </Link>
                </div>
            </div>
            <div className="">
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;
