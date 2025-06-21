import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute ({children}) {
    const { user } = useSelector((state) => state.auth);
    if(!user){
        return <Navigate to="/login" replace/>
    }
    if(user === undefined){
        return <h2>Loading...</h2>
    }
    return children;
}