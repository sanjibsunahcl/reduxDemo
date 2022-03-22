import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    increment: 1,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    updateIncrement: (state, action) => {
      state.increment = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {increment, decrement, updateIncrement} = counterSlice.actions;

export default counterSlice.reducer;
