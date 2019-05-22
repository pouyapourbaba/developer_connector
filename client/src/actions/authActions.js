import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "./tyeps";
import { setAlert } from "./alertActions";
import setAuthToken from "./../utils/setAuthToken";

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const body = { name, email, password };

  try {
    const res = await axios.post("http://localhost:5000/api/users", body);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    
    dispatch(loadUser());
  } catch (ex) {
    const errors = ex.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await axios.post("http://localhost:5000/api/auth", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (ex) {
    const errors = ex.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (ex) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};