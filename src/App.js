// import react from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthTabs from "./components/AuthTabs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import CreateTicket from "./pages/CreateTicket";
import TicketList from "./pages/TicketList";
import SingleTicket from "./pages/SingleTicket";

export default function App(){
    return <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<AuthTabs/>}/>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/tickets/new" element={<PrivateRoute><CreateTicket/></PrivateRoute>}/>
            <Route path="/tickets" element={<PrivateRoute><TicketList/></PrivateRoute>}/>
            <Route path="/tickets/:id" element={<PrivateRoute><SingleTicket/></PrivateRoute>}/>
        </Routes>
    </Router>
}