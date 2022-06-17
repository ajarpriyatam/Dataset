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
    SEND_DATA_REQUEST,
    SEND_DATA_SUCCESS,
    SEND_DATA_FAIL,
    DELETE_DATA_REQUEST,
    DELETE_DATA_SUCCESS,
    DELETE_DATA_FAIL,
    DELETE_DATA_RESET,
    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
    UPDATE_DATA_FAIL,
    UPDATE_DATA_RESET,
    CLEAR_ERRORS,
  } from "../constant/dataConstant";
  
  export const newDataReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_DATA_SUCCESS:
        return {
          loading: false,
          NEWDATA: action.payload,
        };
  
      case CREATE_DATA_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const getDataReducer = (state = { Data: [] }, action) => {
    switch (action.type) {
      case DATA_REQUEST:
        return {
          loading: true,
        };
  
      case DATA_SUCCESS:
        return {
          loading: false,
          Data: action.payload,
        };
  
      case DATA_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const allDataReducer = (state = { Data: [] }, action) => {
    switch (action.type) {
      case ALL_DATA_REQUEST:
        return {
          loading: true,
        };
  
      case ALL_DATA_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
  
      case ALL_DATA_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  export const ModifyDataReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_DATA_REQUEST:
      case DELETE_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case DELETE_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_DATA_FAIL:
      case DELETE_DATA_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_DATA_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case DELETE_DATA_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const sendDataReducer = (state = { Data: [] }, action) => {
    switch (action.type) {
      case SEND_DATA_REQUEST:
        return {
          loading: true,
        };
  
      case SEND_DATA_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
  
      case SEND_DATA_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };