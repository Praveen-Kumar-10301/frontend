import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">Support Ticket System</h1>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, <span className="font-medium">{user.name}</span></span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
