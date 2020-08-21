import moxios from 'moxios';
import { makeMockStore } from '../Utils';

import {
    ActionCreator,
    isArtistAnswerCorrect,
    isGenreAnswerCorrect,
    reducer,
    Operation
} from '../reducer';

const store = makeMockStore({ header: {}, body: {}, footer: {} });
const mockSuccess = data => ({ status: 200, response: {data} });
const mockError = error => ({ status: 500, response: error });

describe(`Business logic is correct`, () => {
    it (`Artist question is checked correctly`, () => {
        expect(isArtistAnswerCorrect( 
            {
                artist: `correct`,
                picture: ``
            }, 
            {
                type: `artist`,
                song: {
                    artist: `correct`,
                    src: ``
                },
                answers: [
                    {
                        picture: ``,
                        artist: `correct`
                    },
                    {
                        picture: ``,
                        artist: `incorrect`
                    },
                    {
                        picture: ``,
                        artist: `incorrect-2`
                    }
                ]
            }
        )).toEqual(true);

        expect(isArtistAnswerCorrect( 
            {
                artist: `incorrect-3`,
                picture: ``
            }, 
            {
                type: `artist`,
                song: {
                    artist: `correct`,
                    src: ``
                },
                answers: [
                    {
                        picture: ``,
                        artist: `correct`
                    },
                    {
                        picture: ``,
                        artist: `incorrect`
                    },
                    {
                        picture: ``,
                        artist: `incorrect-2`
                    }
                ]
            }
        )).toEqual(false);
    });

    it (`Genre question is checked correctly`, () => {
        expect(isGenreAnswerCorrect([false, false, true, false], {
            type: `genre`,
            genre: `rock`,
            answers: [
                {
                    src: `0`,
                    genre: `blues`
                },
                {
                    src: `1`,
                    genre: `blues`
                },
                {
                    src: `2`,
                    genre: `rock`
                },
                {
                    src: `3`,
                    genre: `classic`
                }
            ]
        })).toEqual(true);
    });

    it (`Genre question is checked correctly`, () => {
        expect(isGenreAnswerCorrect([false, false, false, false], {
            type: `genre`,
            genre: `rock`,
            answers: [
                {
                    src: `0`,
                    genre: `blues`
                },
                {
                    src: `1`,
                    genre: `blues`
                },
                {
                    src: `2`,
                    genre: `rock`
                },
                {
                    src: `3`,
                    genre: `classic`
                }
            ]
        })).toEqual(false);
    });
});

describe(`Reducer works correctly`, () => {
    it (`Reducer without additional should return initial state`, () => {
        expect(reducer(undefined, {})).toEqual({
            step: -1,
            mistakes: 0,
            questions: [],
            isAuthorization: false,
            endTime: false,
            minutes: 0,
            seconds: 0,
            errorMessage: null
        });
    });

    it (`Reducer should increment current step by a given value`, () => {
        expect(reducer({
            step: -1,
            mistakes: 0
        }, {
            type: `INCREMENT_STEP`,
            payload: 1
        })).toEqual({
            step: 0,
            mistakes: 0
        });
    });

    it (`Reducer should increment number of mistakes by a given value`, () => {
        expect(reducer({
            step: -1,
            mistakes: 0
        }, {
            type: `INCREMENT_MISTAKES`,
            payload: 1
        })).toEqual({
            step: -1,
            mistakes: 1
        });

        expect(reducer({
            step: -1,
            mistakes: 0
        }, {
            type: `INCREMENT_MISTAKES`,
            payload: 0
        })).toEqual({
            step: -1,
            mistakes: 0
        });
    });

    it (`Reducer should correctly reset application state`, () => {
        expect(reducer({
            step: 228,
            mistakes: 1488
        }, {
            type: `RESET`
        })).toEqual({
            step: -1,
            mistakes: 0,
            questions: [],
            isAuthorization: false,
            endTime: false,
            minutes: 0,
            seconds: 0,
            errorMessage: null
        });
    });

    it (`Reducer should correctly decrement step by a given value`, () => {
        expect(reducer({
            step: 1,
            mistakes: 0
        }, {
            type: `DECREMENT_STEP`,
            payload: 1
        })).toEqual({
            step: 0,
            mistakes: 0
        });

        expect(reducer({
            step: 2,
            mistakes: 1488
        }, {
            type: `DECREMENT_STEP`,
            payload: 1
        })).toEqual({
            step: 1,
            mistakes: 1488
        });
    });
});

describe(`Action creators work correctly`, () => {
    it (`Action creator for incrementing step returns correct action`, () => {
        expect(ActionCreator.incrementStep()).toEqual({
            type: `INCREMENT_STEP`,
            payload: 1
        });
    });

    it (`Action creator for incrementing mistakes returns action with 0 payload of type artist`, () => {
        expect(ActionCreator.incrementMistake(
            {
                artist: `correct`,
                picture: ``
            },
            {
                type: `artist`,
                song: {
                    artist: `correct`,
                    src: ``
                },
                answers: [
                    {
                        artist: `correct`,
                        picture: ``
                    },
                    {
                        artist: `un-correct`,
                        picture: ``
                    },
                    {
                        artist: `un-correct-2`,
                        picture: ``
                    }
                ]
            }, 0, Infinity
        )).toEqual({
            type: `INCREMENT_MISTAKES`,
            payload: 0
        });
    });

    it (`Action creator for incrementing mistakes returns action with 1 payload of type artist`, () => {
        expect(ActionCreator.incrementMistake(
            {
                artist: `incorrect`,
                picture: ``
            },
            {
                type: `artist`,
                song: {
                    artist: `correct`,
                    src: ``
                },
                answers: [
                    {
                        artist: `correct`,
                        picture: ``
                    },
                    {
                        artist: `incorrect`,
                        picture: ``
                    },
                    {
                        artist: `incorrect-2`,
                        picture: ``
                    }
                ]
            }, 0, Infinity
        )).toEqual({
            type: `INCREMENT_MISTAKES`,
            payload: 1
        });
    });

    it (`Action creator for incrementing mistakes returns action with 0 payload of type genre`, () => {
        expect(ActionCreator.incrementMistake([false, false, true, false],
            {
                type: `genre`,
                genre: 'pop',
                answers: [
                    {
                        genre: `rock`,
                        src: ``
                    },
                    {
                        genre: `blues`,
                        src: ``
                    },
                    {
                        genre: `pop`,
                        src: ``
                    },
                    {
                        genre: `rock`,
                        src: ``
                    }
                ]
            }, 0, Infinity
        )).toEqual({
            type: `INCREMENT_MISTAKES`,
            payload: 0
        });
    });

    it (`Action creator for incrementing mistakes returns action with 1 payload of type genre`, () => {
        expect(ActionCreator.incrementMistake([false, true, true, false],
            {
                type: `genre`,
                genre: 'pop',
                answers: [
                    {
                        genre: `rock`,
                        src: ``
                    },
                    {
                        genre: `blues`,
                        src: ``
                    },
                    {
                        genre: `pop`,
                        src: ``
                    },
                    {
                        genre: `rock`,
                        src: ``
                    }
                ]
            }, 0, Infinity
        )).toEqual({
            type: `INCREMENT_MISTAKES`,
            payload: 1
        });
    });

    it (`Action creator resets state if user is answered uncorrectly and have >= maxMistakes`, () => {
        expect(ActionCreator.incrementMistake(
            {
                artist: `incorrect`,
                picture: ``
            },
            {
                type: `artist`,
                song: {
                    artist: `correct`,
                    src: ``
                },
                answers: [
                    {
                        artist: `correct`,
                        picture: ``
                    },
                    {
                        artist: `incorrect`,
                        picture: ``
                    },
                    {
                        artist: `incorrect-2`,
                        picture: ``
                    }
                ]
            }, Infinity, 0
        )).toEqual({
            type: `LOSE_GAME`
        });

        expect(ActionCreator.incrementMistake([true, true, true, false],
            {
                type: `genre`,
                genre: 'pop',
                answers: [
                    {
                        genre: `rock`,
                        src: ``
                    },
                    {
                        genre: `blues`,
                        src: ``
                    },
                    {
                        genre: `pop`,
                        src: ``
                    },
                    {
                        genre: `rock`,
                        src: ``
                    }
                ]
            }, Infinity, 0
        )).toEqual({
            type: `LOSE_GAME`
        });
    });

    it (`Action creator for decrementing step returns correct action`, () => {
        expect(ActionCreator.decrementStep()).toEqual({
            type: `DECREMENT_STEP`,
            payload: 1
        });
    });

    it (`Action creator for load questuins returns correct action`, () => {
        expect(ActionCreator.requireAuthorization(true)).toEqual({
            type: `REQUIRE_AUTHORIZATION`,
            payload: true
        });
    });

    it (`Action creator for timeEnd returns correct action`, () => {
        expect(ActionCreator.timeEnd()).toEqual({
            type: `TIME_END`
        });
    });

    it (`Action creator for getWinTime returns correct action`, () => {
        expect(ActionCreator.getWinTime(0, 0)).toEqual({
            type: `GET_WIN_TIME`,
            minutes: 0,
            seconds: 0
        });
    });

    it (`Action creator errorMessage returns error message`, () => {
        expect(ActionCreator.errorMessage('error')).toEqual({
            type: `ERROR_MESSAGE`,
            payload: 'error'
        });
    });
});

describe(`Testing loadQuestions thunk`, () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    test(`+++ loadQuestions thunk correctly perform 'then' case`, () => {
        const result = {
            questions: [{a: 1}, {b: 1}],
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(result));
        });

        const expectedActions = [ActionCreator.loadQuestions(result.questions)];

        store.dispatch(Operation.loadQuestions()).then(() => {
            const actionsCalled = store.getActions();
            expect(actionsCalled).toEqual(expectedActions);
        });
    });

    test(`+++ loadQuestions thunk correctly perform 'catch' case`, () => {
      const error = 'something was going wrong';

      moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith(mockError(error));
      });

      const expectedActions = [ActionCreator.errorMessage(error)];

      store.dispatch(Operation.loadQuestions()).then(() => {
          const actionsCalled = store.getActions();
          expect(actionsCalled).toEqual(expectedActions);
      });
    });
});