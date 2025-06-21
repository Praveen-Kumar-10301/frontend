import { useState, useEffect } from "react";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Register(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const { name, email, password, role } = formData;

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        ( state ) => state.auth
    );

    useEffect(() => {
        console.log("User from Redux", user);
        if(isSuccess){
            alert("Register Successfully, please login");
            
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch(reset());

            navigate("/login");
            
        }
        if(isError){
            console.log("Error during registration", message);
        }
    }, [user, isSuccess, navigate, dispatch, isError, message]);

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name]:e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(register({name, email, password, role}));
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                {isError && <p style={{color: "red"}}>{message}</p>}
                <input type="text" name="name" value={formData.name} placeholder="Enter the name" onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/><br/>
                <input type="text" name="email" value={formData.email} placeholder="Enter the email" onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/><br/>
                <input type="text" name="password" value={formData.password} placeholder="Enter the password" onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/><br/>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select><br/>
                <button type="Submit" disabled={isLoading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                    {isLoading ? "Registering" : "Register Now"}
                </button>
                <p className="text-sm text-center">Already a registered user?. please <a href="/login">click here</a> to login.</p>
        </form>
        </div>
    );
}