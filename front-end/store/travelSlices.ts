import { TravelState } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
};

export const travelSlices=createSlice({
    name:"travel",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    },
});

export const {setOrigin, setDestination, setTravelTimeInformation} =
    travelSlices.actions;

    // Selectors
export const selectOrigin = (state: TravelState) => state.travel.origin;
export const selectDestination = (state: TravelState) => state.travel.destination;
export const selectTravelTimeInformation = (state: TravelState) => state.travel.travelTimeInformation;

export default travelSlices.reducer;