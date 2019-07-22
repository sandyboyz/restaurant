import Axios from "axios";
import { localhost } from "../util/util";
import { ADD_PRODUCT_CART, COUNT_TOTAL_PRICE, DELETE_PRODUCT_CART, REMOVE_PRODUCT_CART, RESET_PRODUCT_CART } from "./types";
import store from '../store';

export const addProduct = id => dispatch => {
  Axios.get(`${localhost}/api/mainfood/${id}`)
    .then(res => {        
        dispatch({
            type: ADD_PRODUCT_CART,
            payload: {
                id: res.data._id,
                name: res.data.name,
                price: res.data.price,
                quantity:  1
            }
        });
        dispatch({type: COUNT_TOTAL_PRICE});
    })
    .catch(err => console.log(err));
};

export const deleteProduct = id => dispatch => {
    dispatch({
        type: DELETE_PRODUCT_CART,
        payload: {
            id: id,
            quantity: 1
        }
    });
    dispatch({type: COUNT_TOTAL_PRICE});
    console.log(store.getState().cart.list);
    
};

export const removeProduct = id => dispatch => {
    dispatch({
        type: REMOVE_PRODUCT_CART,
        payload: {
            id
        }
    });
    dispatch({type: COUNT_TOTAL_PRICE});
}

export const resetCart = () => dispatch => {
    dispatch({
        type: RESET_PRODUCT_CART
    })
}
