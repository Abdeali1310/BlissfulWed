import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Async Thunk to fetch all bookings
export const fetchBookings = createAsyncThunk(
    "bookings/fetchBookings",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/booking/admin/booking");
            return response.data.booking; // Axios automatically parses JSON
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const bookingSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bookingSlice.reducer;
