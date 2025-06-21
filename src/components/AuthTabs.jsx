import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AuthTabs(){
    const[tab, setTab] = useState("login");

    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex space-x-4 mb-6 justify-center">
          <button
            onClick={() => setTab("login")}
            className={`px-4 py-2 font-semibold rounded ${
              tab === "login" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`px-4 py-2 font-semibold rounded ${
              tab === "register" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>
        {tab === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}