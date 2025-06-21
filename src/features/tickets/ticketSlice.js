import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
    tickets: [],
    ticket: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    comments: [],
};

//Create a new ticket
export const createTicket = createAsyncThunk(
    "tickets/create", async (ticketData, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.createTicket(ticketData, token);
        }
        catch(error){
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Get all tickets:
export const getTickets = createAsyncThunk(
    "tickets/getAll", async(_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTickets(token);
        }
        catch(error){
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Get ticket by id:
export const getTicketById = createAsyncThunk(
    "tickets/getById", async (ticketID, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTicketById(ticketID, token);
        }
        catch(error){
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Get comments:
export const getComments = createAsyncThunk(
    "tickets/getComments", async (ticketID, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getComments(ticketID, token);
        } catch (error){
            const message = error.response?.data.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Add comments:
export const addComments = createAsyncThunk(
    "tickets/addComments", ({ ticketId, comments}, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            console.log("Id from slice", ticketId);
            return ticketService.addComments(ticketId, comments, token);
        } catch(error) {
            const message = error.response?.data.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Update Ticket:
export const updateTicket = createAsyncThunk(
    "tickets/updateStatus", ({ ticketId, status}, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            return ticketService.updateTicket(ticketId, status, token);
        } catch (error){
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Delete Ticket:
export const deleteTicket = createAsyncThunk(
    "tickets/deleteTicket", (ticketId, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token;
            console.log("Delete slice has been called");
            return ticketService.deleteTicket(ticketId, token);
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        resets: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets.push(action.payload);
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTicketById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTicketById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            })
            .addCase(getTicketById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addComments.fulfilled, (state, action) => {
                state.comments.push(action.payload);
                console.log("Added comment from Redux", action.payload);
                
            })
            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                console.log("Comments from Redux", state.comments);
            })
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.ticket = action.payload;
            })
            .addCase(deleteTicket.fulfilled, (state, action) => {
                state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload);
                state.isSuccess = true;
            })
    },
})

export const { resets } = ticketSlice.actions;
export default ticketSlice.reducer;