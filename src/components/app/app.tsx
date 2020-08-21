import React from 'react';
import { connect } from 'react-redux';

import { questions } from '../../data/mock-data';
import { StateType, questionType } from '../../types';

type mapStateToPropsType = {
    step: number
};

type ownAppPropsType = {
    renderScreen: (question: questionType) => any
};

type AppType = mapStateToPropsType & ownAppPropsType;

export const App: React.FC<AppType> = ({ step, renderScreen }) => {
    return (
        <>
            { renderScreen(questions[step]) }
        </>
        )
};

const mapStateToProps = (state: StateType, ownProps: object) => {
    return Object.assign({}, ownProps, {
        step: state.step
    });
};

export default connect<mapStateToPropsType, {}, ownAppPropsType, StateType>(mapStateToProps)(App);