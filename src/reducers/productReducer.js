import {
    GET_PRODUCTS,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    ADD_PRODUCT
  } from '../actions/types';
  
  const initialState = {
    products: [],
    product: {},
    flag: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
          products: action.payload
        };
      case DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(product => product._id !== action.payload),
          flag: true
        };
      case ADD_PRODUCT:
        return {
          ...state,
          products: [action.payload, ...state.products],
          flag: true
        };
      case UPDATE_PRODUCT:
        return {
          ...state,
          flag: true
        };
      default:
        return state;
    }
  }