import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if(isSuccess || user){
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                {isError && <p style={{color: "red"}}>{message}</p>}
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium">Email:</label>
                    <input type="text" name="email" value={formData.email} placeholder="Enter the email" onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/><br/>
                </div>
            
                <div>
                    <label htmlFor="password" className="block mb-1 font-medium">Password:</label>
                    <input type="text" name="password" value={formData.password} placeholder="Enter the password" onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/><br/>
                </div>
            
                <button type="Submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button><br/>
                <p className="text-sm text-center">Don't have an account? please <a href="/register">click here</a> to register.</p>
                {isLoading && <p>Loading...</p>}
            </form>
        </div>
    );
}