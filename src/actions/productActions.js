import axios from 'axios';

import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_ERRORS,
  ADD_PRODUCT
} from './types';

// Get Products
export const getProducts = (filter) => dispatch => {
    axios
      .get(`/api/products/${filter.offset}/${filter.limit}`)
      .then(res =>
        dispatch({
          type: GET_PRODUCTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PRODUCTS,
          payload: null
        })
      );
  };

// Delete Product
export const deleteProduct = id => dispatch => {
  axios
    .delete(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update Product
export const updateProduct = (filters) => dispatch => {
  axios
    .post('/api/products/update', filters)
    .then(res =>
      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Product
export const addProduct = (filters) => dispatch => {
  axios
    .post('/api/products', filters)
    .then(res =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
