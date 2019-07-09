import axios from 'axios';

import {
  GET_PRODUCTS
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
