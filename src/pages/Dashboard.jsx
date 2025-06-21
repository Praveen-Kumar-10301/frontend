import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTickets } from "../features/tickets/ticketSlice";

export default function Dashboard(){
    const dispatch = useDispatch();
    const { isLoading, tickets } = useSelector((state) => state.tickets);

    useEffect(() => {
        dispatch(getTickets())
    },[dispatch]);
    
    const total = tickets.length;
    const open = tickets.filter(ticket =>   ["open", "in-progress", "assigned", "pending"].includes(ticket.status?.toLowerCase())).length;
    const closed = tickets.filter(ticket => ticket.status === "closed").length;
    const latest = tickets.length ? tickets[0] : null;

    return (
        <section className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Dashboard Page</h2>
            <div className="flex justify-center gap-4 mb-6">
                <Link to="/tickets/new">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Create new Ticket</button>
                </Link>
                <Link to="/tickets">
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">Show all tickets</button>
                </Link>
            </div>
            {isLoading ? (
                <p className="text-center text-gray-600">Tickets Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                    <div className="p-4 border rounded-md bg-gray-100">
                        <strong>Total Tickets : </strong>{total}
                    </div>

                    <div className="p-4 border rounded-md bg-green-100">
                        <strong>Open Tickets : </strong>{open}
                    </div>
                    
                    <div className="p-4 border rounded-md bg-red-100">
                        <strong>Closed Tickets : </strong>{closed}
                    </div>

                    {latest && (
                        <div className="p-4 border rounded-md bg-yellow-100">
                            <strong>Latest Ticket : </strong>{latest.title}({latest.status})
                        </div>
                    )}
                </div>
            )}
        </section>
    );    
}