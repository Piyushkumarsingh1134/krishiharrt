// import {createSlice} from "@reduxjs/toolkit"

// const cartSlice = createSlice({
//     name:"Cart",
//     initialState:[],
//     reducers:{
//         add(state,action){
//             state.push(action.payload);
//         },
//         remove(state,action){
//             return state.filter((item)=>item.id !== action.payload);
//         }
//     }

// })

// export const {add,remove} = cartSlice.actions;
// export default cartSlice.reducer;
// src/redux/Cartslice.js
// src/redux/Cartslice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cart: [], 
// };

// const Cartslice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     add: (state, action) => {
//       state.cart.push(action.payload);
//     },
//     remove: (state, action) => {
      
//       state.cart = state.cart.filter(item => item._id !== action.payload);
//     },
   
//   },
// });

// export const { add, remove } = Cartslice.actions;
// export default Cartslice.reducer;
// src/redux/Cartslice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [], 
};

const Cartslice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        
        state.cart[itemIndex].quantity += 1;
      } else {
        
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cart.push(tempProduct);
      }
    },
    remove: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload
      );

      if (itemIndex >= 0) {
        if (state.cart[itemIndex].quantity > 1) {
         
          state.cart[itemIndex].quantity -= 1;
        } else {
     
          state.cart.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    
    increaseQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex >= 0 && state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
      }
    },
  },
});

export const { add, remove, clearCart, increaseQuantity, decreaseQuantity } =
  Cartslice.actions;
export default Cartslice.reducer;

