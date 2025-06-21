import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTickets } from "../features/tickets/ticketSlice";

export default function TicketList(){
    const dispatch = useDispatch();
    const {isLoading, isError, message, tickets} = useSelector((state) => state.tickets);

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    if(isLoading) return <p>Tickets Loading...</p>
    if(isError) return <p>Error: {message}</p>

    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">All Tickets</h2>
                <Link to="/dashboard">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">Back to Dashboard</button>
                </Link>
            </div>
            {tickets.length === 0 ? (
                <p className="text-gray-600 text-center">No tickets found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-md">
                        <thead className="bg-gray-100">
                            <tr className="text-left text-gray-600 text-sm">
                                <th className="p-3 border-b">Ticket_ID</th>
                                <th className="p-3 border-b">Title</th>
                                <th className="p-3 border-b">Status</th>
                                <th className="p-3 border-b">Created</th>
                                <th className="p-3 border-b">Details</th>
                            </tr>
                        </thead>
                        <tbody >
                            {tickets.map((ticket) => {
                                return <tr key={ticket.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{ticket.id}</td>
                                    <td className="p-3 border-b">{ticket.title}</td>
                                    <td className="p-3 border-b">{ticket.status}</td>
                                    <td className="p-3 border-b">{ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : "N/A"}</td>
                                    <td className="p-3 border-b">
                                        <Link to={`/tickets/${ticket.id}`} className="text-blue-600 hover:underline">View</Link>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}