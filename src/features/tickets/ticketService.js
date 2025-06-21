import axios from "axios";

const base_URL = "http://localhost:3001/api/tickets/";

const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };
    
    const response = await axios.post(base_URL, ticketData, config);
    console.log("response from backend", response.data);
    
    return response.data;
};

const getTickets = async(token) => {
    const config = {
          headers: {
              Authorization: `Bearer ${token}`
          },
    };

    const response = await axios.get(base_URL, config);
    return response.data;
}

const getTicketById = async(ticketID, token) => {
    const response = await axios.get(base_URL+`${ticketID}`, {
        headers:{ 
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

const getComments = async(ticketID, token) => {
    const response = await axios.get(`http://localhost:3001/api/comments/${ticketID}`, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}

const addComments = async(ticketID, comments, token) => {
    console.log("ID from API call", ticketID);
    const response = await axios.post(`http://localhost:3001/api/comments/${ticketID}`, {comments}, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}

const updateTicket = async(ticketID, status, token) => {
    const response = await axios.put(base_URL + `${ticketID}`, { status }, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}

const deleteTicket = async(ticketID, token) => {
    const response = await axios.delete(base_URL + `${ticketID}`, {
        headers: {Authorization: `Bearer ${token}`}
    });
    console.log("Response from ticketService", response);
    return response.data;
}

const ticketService = {
    createTicket,
    getTickets,
    getTicketById,
    getComments,
    addComments,
    updateTicket,
    deleteTicket,
};

export default ticketService;