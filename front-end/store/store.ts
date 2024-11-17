import { configureStore } from '@reduxjs/toolkit'
import travelReducer from "./travelSlices"

export const store = configureStore({
  reducer: {
    travel:travelReducer,
  },
})