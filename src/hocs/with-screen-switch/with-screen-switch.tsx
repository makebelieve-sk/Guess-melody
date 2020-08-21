import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { questions } from '../../data/mock-data';
import { questionType, userAnswerType, isArtistAnswerType, StateType } from "../../types";
import { WinScreen } from "../../components/win-screen/win-screen";
import { LoseScreen } from "../../components/lose-screen/lose-screen";
import { AuthorizationScreen } from "../../components/authorization-screen/authorization-screen";
import { ScreenHello } from "../../components/screen-hello/screen-hello";
import { GenreQuestionScreen } from "../../components/genre-question-screen/genre-question-screen";
import { ArtistQuestionScreen } from "../../components/artist-question-screen/artist-question-screen";
import { withActivePlayer } from "../with-active-player/with-active-player";
import withUserAnswer from "../with-user-answer/with-user-answer";
import { Header } from "../../components/header/header";
import { ActionCreator } from "../../reducer/reducer";
import history from '../../history';

type mapStateToPropsType = {
    mistakes: number,
    step: number,
    isAuthorization: boolean,
    endTime: boolean,
    minutes: string | number,
    seconds: string | number,
};

type mapDispatchToPropsType = {
    onHelloScreenClick: () => any,
    onUserAnswer: (userAnswer: userAnswerType | isArtistAnswerType,
        question: questionType,
        mistakes: number,
        maxMistakes: number) => any,        
    onScreenBack: () => any,
    onHomeBack: () => any,    
    timeEnd: () => any,
    getWinTime: (min: string, sec: string) => any,    
    reset: () => any
};

type WithScreenSwitchType = mapStateToPropsType & mapDispatchToPropsType;

const GenreQuestionScreenWrapped = withActivePlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent<WithScreenSwitchType, null> {
    constructor(props: WithScreenSwitchType) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    };

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact render={() => <Component
                        {...this.props}
                        renderScreen={this._getScreen}
                    />} />
                    <Route path="/results" render={() => <WinScreen 
                        isAuthorization={this.props.isAuthorization} 
                        mistakes={this.props.mistakes} 
                        step={this.props.step} 
                        minutes={this.props.minutes} 
                        seconds={this.props.seconds}
                        reset={this.props.reset}  
                    />} />
                    <Route path="/lose" render={() => <LoseScreen endTime={this.props.endTime} reset={this.props.reset} />} />
                    <Route path="/login" component={AuthorizationScreen} />
                </Switch>
            </Router>
        );
    };

    _getScreen(question: questionType) {
        const GenreQuestionScreenSecondWrapped = withUserAnswer(GenreQuestionScreenWrapped, question);
        
        const {
            mistakes,
            step,
            onHelloScreenClick,
            onUserAnswer,        
            onScreenBack,
            onHomeBack,    
            timeEnd,
            getWinTime
        } = this.props;

        const settings = {
            time: 5,
            maxMistakes: 3
        };

        const { time, maxMistakes } = settings;

        let renderComponent;

        if (step >= questions.length) {
            return <Redirect from='/' to="/results" />;
        }

        if (step === -2) {
            return <Redirect from='/' to="/lose" />;
        };

        if (step === -1) {
            return <ScreenHello
                time={time} 
                mistakes={maxMistakes} 
                onStartButtonClick={onHelloScreenClick}
            />;
        };

        if (question.type === 'genre') {
            renderComponent = (   
                <GenreQuestionScreenSecondWrapped 
                    question={question}
                    onAnswer={(userAnswer: userAnswerType | isArtistAnswerType) => onUserAnswer(
                        userAnswer,
                        question,
                        mistakes,
                        maxMistakes
                    )}  
                />
            );
        } else {
            renderComponent = (
                <ArtistQuestionScreenWrapped 
                    question={question}
                    onAnswer={(userAnswer: userAnswerType | isArtistAnswerType) => onUserAnswer(
                        userAnswer,
                        question,
                        mistakes,
                        maxMistakes
                    )}
                />
            );
        };

        return (
            <>
                <Header 
                    onBack={onScreenBack}
                    onHome={onHomeBack}
                    mistakes={mistakes}
                    timeEnd={timeEnd}
                    getWinTime={getWinTime}
                />
                { renderComponent }
            </>
        );
    };
};

  return WithScreenSwitch;
};

export {withScreenSwitch};

const mapStateToProps = (state: StateType, ownProps: object) => {
    return Object.assign({}, ownProps, {
        step: state.step,
        mistakes: state.mistakes,
        isAuthorization: state.isAuthorization,
        endTime: state.endTime,
        minutes: state.minutes,
        seconds: state.seconds
    });
};

const mapDispatchToProps = (dispatch) => ({
    onHelloScreenClick: () => dispatch(ActionCreator.incrementStep()),
    onUserAnswer: (userAnswer: userAnswerType | isArtistAnswerType, question: questionType, mistakes: number, maxMistakes: number) => {
        dispatch(ActionCreator.incrementStep());
        dispatch(ActionCreator.incrementMistake(
            userAnswer,
            question,
            mistakes,
            maxMistakes
        ))
    },
    onScreenBack: () => dispatch(ActionCreator.decrementStep()),
    onHomeBack: () => dispatch(ActionCreator.reset()),
    timeEnd: () => dispatch(ActionCreator.timeEnd()),
    getWinTime: (min: string, sec: string) => dispatch(ActionCreator.getWinTime(min, sec)),
    reset: () => dispatch(ActionCreator.reset())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);