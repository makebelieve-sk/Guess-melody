import { ThunkAction } from "redux-thunk";

import { reducer, ActionCreator } from './reducer/reducer';

type PropertyTypes<T> = T extends {[key: string]: infer U} ? U : never;
type InferActionsType<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertyTypes<T>>
type ActionCreatorType = InferActionsType<typeof ActionCreator>

type StateType = ReturnType<typeof reducer>;
type ThunkType = ThunkAction<Promise<void>, StateType, any, ActionCreatorType>;
// type ExtraArgumentType = {
//     api: AxiosInstance
// };

type questionType = {
    type: string,
    genre?: string,
    song?: {
        src: string,
        artist: string
    },
    answers: {
        id: number,
        src?: string,
        genre?: string,
        picture?: string,
        artist?: string
    }[]
};

type questionsType = questionType[];

type userAnswerType = {
    userAnswer: boolean[]
};

type isArtistAnswerType = {
    id: number,
    picture?: string,
    artist?: string
};

type isGenreAnswerType = {
    id?: number,
    src?: string,
    genre?: string
};

export {
    StateType,
    ThunkType,
    ActionCreatorType,
    questionsType,
    questionType,
    userAnswerType,
    isArtistAnswerType,
    isGenreAnswerType
}