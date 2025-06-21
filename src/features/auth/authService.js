import axios from "axios";

const base_URL = "api/auth/";

//Register
const register = async (userData) => {
    const response = await axios.post(base_URL + "register", userData);
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

//Login
const login = async (userData) => {
    const response = await axios.post(base_URL + "login", userData);
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data
};

//Logout
const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

const authService = {
    register,
    login,
    logout
};

export default authService;