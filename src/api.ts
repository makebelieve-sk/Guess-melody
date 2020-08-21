import axios from 'axios';
import { ActionCreator } from './reducer/reducer';

const createAPI = (dispatch) => {
    const api = axios.create({
        baseURL: `https://es31-server.appspot.com/guess-melody`,
        timeout: 5000,
        withCredentials: true
    });
    
    const onSuccess = (response) => response;
    
    const onFail = (err) => {
            if (err.response.status === 403) {
                dispatch(ActionCreator.requireAuthorization())
            }
    
            return err;
    };
    
    api.interceptors.response.use(onSuccess, onFail);

    return api;
};

export default createAPI;