import { ThunkType, ActionCreatorType, questionsType, questionType, isArtistAnswerType } from '../types';

const isArtistAnswerCorrect = (userAnswer: isArtistAnswerType, question: questionType) => {
    return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (userAnswer: boolean[], question: questionType) => {
    return userAnswer.every((it, i) => it === (
        question.answers[i].genre === question.genre
    ));
};

type initialStateType = {
    step: number,
    mistakes: number,
    questions?: any[],
    isAuthorization: boolean,
    endTime: boolean,
    minutes: string | number,
    seconds: string | number,
    errorMessage: null
};

const initialState: initialStateType = {
    step: -1,
    mistakes: 0,
    questions: [],
    isAuthorization: false,
    endTime: false,
    minutes: 0,
    seconds: 0,
    errorMessage: null
};  

const reducer = (state = initialState, action: ActionCreatorType) => {
    switch (action.type) {
        case `INCREMENT_STEP`:
            return Object.assign({}, state, {
                step: state.step + action.payload
            });
        case `INCREMENT_MISTAKES`:
            return Object.assign({}, state, {
                mistakes: state.mistakes + action.payload
            });
        case `RESET`:
            return Object.assign({}, initialState);
        case `DECREMENT_STEP`:
            return Object.assign({}, state, {
                step: state.step - action.payload
            });
        case `LOAD_QUESTION`:
            return Object.assign({}, state, {
                questions: action.payload
            });
        case `REQUIRE_AUTHORIZATION`: 
            return Object.assign({}, state, {
                isAuthorization: action.payload
            });
        case `LOSE_GAME`:
            return Object.assign({}, state, {
                step: -2
            });
        case `TIME_END`:
            return Object.assign({}, state, {
                step: -2,
                endTime: true
            });
        case `GET_WIN_TIME`:
            return Object.assign({}, state, {
                minutes: action.minutes,
                seconds: action.seconds
            });
        case `ERROR_MESSAGE`:
            return Object.assign({}, state, {
                errorMessage: action.payload
            });
        default:
            return state
    }
};

const Operation = {
    loadQuestions: (): ThunkType  => (dispatch, _, api)=> {
        return api.get(`/questions`)
            .then((response) => {
                dispatch(ActionCreator.loadQuestions(response.data));
            })
            .catch((err) => {
                dispatch(ActionCreator.errorMessage(err))
            })
    }
};

const ActionCreator = {
    incrementStep: () => {
        return {
            type: `INCREMENT_STEP`,
            payload: 1
        } as const
    },
    incrementMistake: (userAnswer, question: questionType, mistakes: number, maxMistakes: number) => {
        let answerIsCorrect = false;

        switch (question.type) {
            case `artist`: 
                answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
                break;
            case `genre`: 
                answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
                break;
        };

        if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
            return {
                type: `LOSE_GAME`
            } as const
        }

        return {
            type: `INCREMENT_MISTAKES`,
            payload: answerIsCorrect ? 0 : 1
        } as const
    },
    decrementStep: () => {
        return {
            type: `DECREMENT_STEP`,
            payload: 1
        } as const
    },
    reset: () => ({
        type: `RESET`
    } as const),
    loadQuestions: (questions: questionsType) => {
        return {
            type: `LOAD_QUESTION`,
            payload: questions,
        } as const
    },
    requireAuthorization: (status?: boolean) => {
        return {
            type: `REQUIRE_AUTHORIZATION`,
            payload: status
        } as const
    },
    timeEnd: () => ({
        type: `TIME_END`
    } as const),
    getWinTime: (minutes: string, seconds: string) => ({
        type: `GET_WIN_TIME`,
        minutes: minutes,
        seconds: seconds
    } as const),
    errorMessage: (err: string) => {
        return {
            type: `ERROR_MESSAGE`,
            payload: err
        } as const
    },
};

export {
    ActionCreator,
    isArtistAnswerCorrect,
    isGenreAnswerCorrect,
    reducer,
    Operation
};