import axios from "axios";
import { setAlert } from './alertActions';

import { GET_PROFILE, PROFILE_ERROR } from './tyeps';

// get current uesr's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data.profile
        })
    } catch (ex) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: ex.response.statusText,  status: ex.response.status}
        })
    }
}