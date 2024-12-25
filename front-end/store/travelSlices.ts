import { TravelState } from "@/app/models/Travel";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    routeWaypoints: null,
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
        setRouteWaypoints: (state, action) => {
            state.routeWaypoints = action.payload;
        },
    },
});

export const {setOrigin, setDestination, setTravelTimeInformation, setRouteWaypoints} =
    travelSlices.actions;

    // Selectors
export const selectOrigin = (state: TravelState) => state.travel.origin;
export const selectDestination = (state: TravelState) => state.travel.destination;
export const selectTravelTimeInformation = (state: TravelState) => state.travel.travelTimeInformation;
export const selectRouteWaypoints = (state: TravelState) => state.travel.routeWaypoints;

export default travelSlices.reducer;