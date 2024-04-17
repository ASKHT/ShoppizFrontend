import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUserAction } from '../redux/features/authSlice';


const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({ name: '', email: '', password: '' })

    const {loading, data, error} = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        if (!user.name || !user.email || !user.password) {
            toast.error('mandatory field missing')
        } else if (user.name && user.name.length < 3) {
            toast.error('name length less than 3 characters')
        } else if (user.password && user.password.length < 6) {
            toast.error('password length less than 6 characters')
        } else {
            await dispatch(registerUserAction(user))
            if(error) {
                toast.error(error)
            }
        }
    }

    useEffect(() => {
        if(data) {
            navigate('/')
        } else if(error) {
            toast.error(error)
        }
    }, [error,data])

    return (
        <div className='flex justify-center items-center max-w[500px] h-[90vh] '>
            <div className="shadow-xl p-10 border-2 border-slate-200">
                <div className="text-3xl text-black font-bold text-center mb-5 font-mono">Register</div>
                <form className='flex flex-col gap-5' onSubmit={handleRegister}>
                    <input type="text" placeholder='Name' name="name" value={user.name} className='px-5 py-2 rounded-lg border-2 border-black outline-none' onChange={handleChange} />
                    <input type="text" placeholder='Email' name="email" value={user.email} className='px-5 py-2 rounded-lg border-2 border-black outline-none' onChange={handleChange} />
                    <input type="password" placeholder='Password' name="password" value={user.password} className='px-5 py-2 rounded-lg border-2 border-black outline-none' onChange={handleChange} />

                    <button className='bg-black text-white w-full px-5 py-2 rounded-lg mb-5'>
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>
                <Link to='/login' className="text-red-500 underline">Customer Already? Login</Link>
                <ToastContainer
                    position="bottom-center"
                    autoClose={1000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </div>
    )
}

export default Register