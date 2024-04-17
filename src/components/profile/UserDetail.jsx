import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserAction } from "../../redux/features/authSlice";

const UserDetail = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.auth);
    const [userProfile, setUserProfile] = useState({
        name: data.name || "",
        email: data.email || "",
        mobile: data.mobile || "",
    });

    const handleChange = (e) => {
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    };
    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updateUserAction(userProfile));
    };

    return (
        <div className="px-10">
            <div className="text-2xl font-bold mb-5">Account Details</div>
            <form className="flex flex-col gap-7">
               <div className="flex gap-3">
                    <div className="flex items-center gap-5">
                    <label htmlFor="name" className="font-bold">
                        Email
                    </label>
                    <input
                        id="name"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={userProfile?.email}
                        onChange={handleChange}
                        className="border-2 border-gray rounded-md px-5 py-2"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={userProfile?.name}
                        onChange={handleChange}
                        className="border-2 border-gray rounded-md px-5 py-2"
                    />
                </div>
               </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="mobile" className="font-bold">
                        Mobile
                    </label>
                    <input
                        id="mobile"
                        type="number"
                        placeholder="Mobile No."
                        name="mobile"
                        value={userProfile?.mobile}
                        onChange={handleChange}
                        className="border-2 border-gray rounded-md px-5 py-2 w-[35rem]"
                    />
                </div>

                <button
                    type="submit"
                    className="border-2 border-gray rounded-md px-5 py-2 self-end"
                    onClick={handleSave}
                >
                    Save
                </button>
            </form>
        </div>
    );
};
export default UserDetail;
