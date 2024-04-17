import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { addAddressApi } from "../api/address.api";
const AddressForm = () => {
    // const { state } = useLocation();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        name: "",
        mobile: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            address.name.trim() == "" ||
            address.mobile.trim() == "" ||
            address.street.trim() == "" ||
            address.city.trim() == "" ||
            address.state.trim() == "" ||
            address.country.trim() == "" ||
            address.zipcode.trim() == ""
        ) {
            alert("Required field missing");
        } else {
            try {
                await addAddressApi(address);
                navigate("/profile/address");
            } catch (error) {
                alert(error);
            }
        }
    };

    // useEffect(() => {
    //     if (location?.state?.key === "edit") {
    //         setLoading(true);
    //         getJobApi(`/job/${jobid}`)
    //             .then((res) => {
    //                 setLoading(false);
    //                 setData(res.job);
    //             })
    //             .catch((error) => {
    //                 setLoading(false);
    //                 setError(error);
    //             });
    //     }
    // }, [jobid]);

    return (
        <div className="px-10">
            <h1 className="text-2xl font-semibold">Fill Address details Here</h1>
            <form action="" className="flex flex-col gap-2 my-3" onSubmit={handleSubmit}>
                <div className="flex items-center gap-5">
                    <label htmlFor="name" className="w-40">
                        name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={address?.name}
                        placeholder="Name"
                        onChange={handleChange}
                        className="border-2 border-gray-400 w-full  rounded-md px-2 py-2 outline-none"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="mobile" className="w-40">
                        mobile
                    </label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={address?.mobile}
                        placeholder="Mobile No. should be 10 digit"
                        onChange={handleChange}
                        className="border-2 border-gray-400 w-full  rounded-md px-2 py-2 outline-none"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="street" className="w-40">
                        street
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={address?.street}
                        placeholder="Street, House No./ Apartment"
                        onChange={handleChange}
                        className="border-2 border-gray-400 w-full  rounded-md px-2 py-2 outline-none"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="city" className="w-40">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={address?.city}
                        placeholder="City"
                        onChange={handleChange}
                        className="border-2 border-gray-400 w-full  rounded-md px-2 py-2 outline-none"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="state" className="w-40">
                        State
                    </label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={address?.state}
                        placeholder="State"
                        onChange={handleChange}
                        className="border-2 border-gray-400 w-full  rounded-md px-2 py-2 outline-none"
                    />
                </div>

                <div className="flex items-center gap-5">
                    <label htmlFor="country" className="w-40">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={address?.country}
                        placeholder="Country"
                        onChange={handleChange}
                        className="border-2 border-gray-400 w-full  rounded-md px-2 py-2 outline-none"
                    />
                </div>

                <div className="flex items-center gap-5">
                    <label htmlFor="zipcode" className="w-40">
                        ZipCode
                    </label>
                    <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={address?.zipcode}
                        placeholder="Zipcode"
                        onChange={handleChange}
                        className="border-2 border-gray-400 w-full  rounded-md px-2 py-2 outline-none"
                    />
                </div>
                <div className="flex gap-2 self-end">
                    <button
                        className="border-2 border-gray rounded-md px-5 py-2"
                        onClick={() => navigate("/profile/address")}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="border-2 border-gray rounded-md px-5 py-2">
                        Add Address
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AddressForm;
