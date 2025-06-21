import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket, resets } from "../features/tickets/ticketSlice";

export default function CreateTicket() {
  const [formData, setformData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "low",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(createTicket(formData));
    navigate("/tickets/new");
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/tickets");
    }
    return () => {
      dispatch(resets());
    };
  }, [isSuccess, dispatch, navigate]);

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Create New Ticket
      </h2>

      {isError && (
        <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">{message}</p>
      )}

      <form onSubmit={handleClick} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Summary
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Notes
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="status" className="block mb-1 font-medium">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="open">Open</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In-Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block mb-1 font-medium">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Create Ticket
        </button>

        {isLoading && <p className="text-center text-gray-600">Submitting...</p>}
      </form>
    </section>
  );
}
