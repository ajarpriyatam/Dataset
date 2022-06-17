import {
    CREATE_DATA_REQUEST,
    CREATE_DATA_SUCCESS,
    CREATE_DATA_FAIL,
    DATA_REQUEST,
    DATA_SUCCESS,
    DATA_FAIL,
    ALL_DATA_REQUEST,
    ALL_DATA_SUCCESS,
    ALL_DATA_FAIL,
    DELETE_DATA_REQUEST,
    DELETE_DATA_SUCCESS,
    DELETE_DATA_FAIL,
    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
    UPDATE_DATA_FAIL,
    SEND_DATA_REQUEST,
    SEND_DATA_SUCCESS,
    SEND_DATA_FAIL,
    CLEAR_ERRORS,
  } from "../constant/dataConstant";
  
  import axios from "axios";
  
  export const createData = (perdata) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_DATA_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/data/new", perdata, config);
      dispatch({ type: CREATE_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_DATA_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const singleData = (id) => async (dispatch) => {
    try {
      dispatch({ type: DATA_REQUEST });
      const { data } = await axios.get(`/api/v1/Data/${id}`);
      dispatch({ type: DATA_SUCCESS, payload: data.data});
    } catch (error) {
      dispatch({
        type: DATA_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const AllData = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_DATA_REQUEST });
      const { data } = await axios.get("/api/v1/all/data");
      dispatch({ type: ALL_DATA_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: ALL_DATA_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const deleteData = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_DATA_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/data_delete/${id}`);
  
      dispatch({ type: DELETE_DATA_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_DATA_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  export const updateData = (newd) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_DATA_REQUEST });
      const { data } = await axios.put(`/api/v1/data_update`,newd);
  
      dispatch({ type: UPDATE_DATA_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_DATA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const send_Data = (msg) => async (dispatch) => {
    console.log(msg);
    try {
      dispatch({ type: SEND_DATA_REQUEST });
      const { data } = await axios.post("/api/v1/send_data",msg);
      dispatch({ type: SEND_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SEND_DATA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };