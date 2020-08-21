import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { StateType } from '../types';
import { Action } from 'redux';

let axiosInstance = axios.create();

type DispatchExts = ThunkDispatch<StateType, any, Action<any>>;

const mockStore = configureStore<StateType, DispatchExts>([thunk.withExtraArgument(axiosInstance)]);

export const makeMockStore = (state) => {
    return mockStore({
        ...state
    });
};