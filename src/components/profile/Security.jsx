import { useState } from "react";
import { changePasswordApi } from "../../api/user.api";
import { toast } from "react-toastify";

const Security = () => {
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const data = await changePasswordApi(passwords);
            toast.success(data.message);
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="px-10">
            <div className="text-2xl font-bold mb-5">Account Security</div>
            <form className="flex flex-col gap-3 " onSubmit={handleChangePassword}>
                <div className="text-xl">Reset Password</div>
                <div className="flex items-center gap-5">
                    <label htmlFor="old" className="">
                        Old Password
                    </label>
                    <input
                        id="old"
                        type="text"
                        name="oldPassword"
                        value={passwords.oldPassword}
                        onChange={handleChange}
                        placeholder="Old Password"
                        className="border-2 border-gray rounded-md px-5 py-2"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <label htmlFor="new" className="">
                        New Password
                    </label>
                    <input
                        id="new"
                        type="text"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="border-2 border-gray rounded-md px-5 py-2"
                    />
                </div>

                <button type="submit" className="border-2 border-gray rounded-md px-5 py-2 self-center">
                    Change Password
                </button>
            </form>
        </div>
    );
};
export default Security;
