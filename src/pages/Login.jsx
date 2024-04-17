import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../redux/features/authSlice.js";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.auth);
    const [user, setUser] = useState({ email: "", password: "" });

    const handleChange = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            toast.error("mandatory field missing");
        } else {
            await dispatch(loginUserAction(user));
            if (error) {
                toast.error(error);
            }
        }
    };

    useEffect(() => {
        if (data) {
            navigate("/");
        } else if (error) {
            toast.error(error);
        }
    }, [error, data]);

    return (
        <div className="flex justify-center items-center max-w[500px] h-[90vh] ">
            <div className="shadow-2xl p-10 border-2 border-slate-200">
                <div className="text-3xl text-black  font-bold text-center mb-5">Login</div>
                <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        className="px-5 py-2 rounded-lg border-2 border-black outline-none"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        className="px-5 py-2 rounded-lg border-2 border-black outline-none"
                        onChange={handleChange}
                    />
                    <button className="bg-black text-white w-full px-5 py-2 rounded-lg mb-5">
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <Link to="/register" className="text-red-500 underline">
                    New to Digicart? Create an account
                </Link>
            </div>
        </div>
    );
};

export default Login;
