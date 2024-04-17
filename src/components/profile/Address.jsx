import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAddressApi } from "../../api/address.api";

const Address = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState();

    useEffect(() => {
        const getAddress = async () => {
            try {
                const { address } = await getAddressApi();
                // console.log(address[0]._id)
                setAddress(address);
            } catch (error) {
                alert(error);
            }
        };
        getAddress();
    }, []);

    return (
        <div className="px-10 w-[70vw] ">
            <div className="flex justify-between mb-5 w-full">
                <div className="text-2xl font-bold ">Address</div>
                <button
                    className="border-2 border-gray rounded-md px-5 py-2"
                    onClick={() => navigate("/profile/address/add")}
                >
                    Add Address
                </button>
            </div>
            <hr />
            <div className="flex flex-wrap gap-2">
                {address ? (
                    address?.map((item) => (
                          
                        <div key={item._id} className="basis-[50%] shadow-2xl shadow-slate-300 rounded-md p-5 my-2">
                            <h1 className="text-xl font-bold">Billing Address</h1>
                            <div className="font-semibold">{item.name}</div>
                            <div className="my-2 text-sm">
                                <div className="">
                                    <div className="">{item.street} </div>
                                    <div className="">{`${item.city} - ${item.zipcode}`} </div>
                                    <div className="">{`${item.state}, ${item.country}`} </div>
                                </div>
                            </div>
                            <div className="text-sm">Mobile : {item.mobile}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-center my-10">No Address Found</p>
                )}
            </div>
        </div>
    );
};
export default Address;
