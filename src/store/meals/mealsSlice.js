import { createSlice } from "@reduxjs/toolkit"
import { getFoods } from "./mealsThunk"

export const ActionTypeMeals = {
  MEALS: 'MEALS',
}

const initialState = {
  meals: [],
  isLoading:false,
  isError:""
}

export const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypeMeals.MEALS:
      return { ...state, meals: action.payload }
    default:
      return state
  }
}

export const mealsSlice = createSlice({
  name:"meals",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getFoods.fulfilled,(state,action)=>{
      state.meals = action.payload;
      state.isLoading = false;
      state.isError = ""
    })
    .addCase(getFoods.pending,(state)=>{
      state.isLoading = true ;
      state.meals =[];
      state.isError = "";
    })
    .addCase(getFoods.rejected,(state,action)=>{
      state.isLoading = false;
      state.meals = [];
      state.isError = action.payload;
    })
  }
})