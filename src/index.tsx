import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';

import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';
import { App } from './components/app/app';
import createAPI from './api';
import history from './history';
import { reducer } from './reducer/reducer';

const AppWrapped = withScreenSwitch(App);

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

export const api = createAPI(() => history.push(`/login`));

//store.dispatch(Operation.loadQuestions());

const store = createStore(
    reducer, 
    compose (
        applyMiddleware(thunk.withExtraArgument(api)),
        __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
    )
);

ReactDOM.render(
    <Provider store={store}>
        <AppWrapped />
    </Provider>, 
    document.getElementById('root')
);