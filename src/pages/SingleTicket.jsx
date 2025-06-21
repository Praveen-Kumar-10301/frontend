import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteTicket, getTicketById } from "../features/tickets/ticketSlice";
import { addComments, getComments, updateTicket } from "../features/tickets/ticketSlice";

export default function SingleTicket(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id }  = useParams();
    const { ticket, isLoading, isError, message, comments } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.auth);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        dispatch(getTicketById(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id]);

    const handleComments = () => {
        if(commentText.trim()){
            dispatch(addComments({ticketId: id, comments: commentText}));
            setCommentText("");
        }
    };

    const handleDelete = async () => {
        if(window.confirm("Are you sure you want to delete the ticket ?")){
            await dispatch(deleteTicket(id));
            navigate("/tickets");
        }
    };

    if(isLoading) return <p>Loading Ticket details</p>;
    if(isError) return <p>Error : {message}</p>;
    if(!ticket) return <p>Ticket not found...</p>;

    return (
        <section className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Ticket Details</h2>
            
            <div className="space-y-2 mb-6 text-gray-700">
                <p><strong>Title: </strong>{ticket.title}</p>
                <p><strong>Description: </strong>{ticket.description}</p>
                <p><strong>Status: </strong>{ticket.status}</p>
                <p><strong>Priority: </strong>{ticket.priority}</p>
                <p><strong>Created By: </strong>{ticket.created_by}</p>
                <p><strong>Creation Date: </strong>{new Date(ticket.created_at).toLocaleDateString()}</p>
                <p><strong>Last Modified By: </strong>{ticket?.last_modifed_by || "N/A"}</p>
                <p><strong>Last Modified Date: </strong>{ticket?.updated_at || "N/A"}</p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Comments:</h3>
                <ul className="space-y-2 mb-4 text-sm text-gray-700">
                    {comments.map((comment) => (
                        <li key={comment.id} className="bg-gray-100 p-2 rounded">
                            <strong>{comment.comment} : </strong>{comment.user_name}({new Date(comment.created_at).toLocaleDateString()})
                        </li>
                    ))}
                </ul>
                <textarea 
                    rows="3" 
                    value={commentText} 
                    onChange={(e) => setCommentText(e.target.value)} 
                    placeholder="Add a comment"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button type="Submit" onClick={handleComments} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Comment</button>
            </div>

            <div className="mb-6">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Update ticket status</label>
                <select 
                    name="status" 
                    value={ticket.status} 
                    onChange={
                        (e) => dispatch(updateTicket({ticketId: id, status: e.target.value}))}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="open">Open</option>
                    <option value="In-progress">In-Progress</option>
                    <option value="assigned">Assigned</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            <div>
                {user.role === "admin" && (
                    <div className="mb-4">
                        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Delete Ticket
                        </button>
                    </div>
                )}
            </div>

            <Link to="/tickets">
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back to ticket list</button>
            </Link>
        </section>
    );
}