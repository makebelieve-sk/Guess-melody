import React, { PureComponent } from 'react';
import { Subtract } from "utility-types";

import { isGenreAnswerType } from '../../types';

import AudioPlayer from '../../components/audio-player/audio-player';

type InjectedProps = {
    renderPlayer: () => any
};

type withActivePlayerState = {
    activePlayer: number
};

export const withActivePlayer = (Component) => {
    type P = React.ComponentProps<typeof Component>;
    type T = Subtract<P, InjectedProps>;

    class WithActivePlayer extends PureComponent<T, withActivePlayerState> {
        constructor(props: T) {
            super(props);

            this.state = {
                activePlayer: -1
            };
        };

        onPlayButtonClickFunc(i: number) {
            this.setState((prevState) => ({
                activePlayer: prevState.activePlayer === i ? -1 : i
            }))
        }

        render() {
            const { activePlayer } = this.state;
            
            return <Component
                {...this.props}
                renderPlayer={(answer: isGenreAnswerType, i: number) => {
                    return <AudioPlayer
                        src={answer.src}
                        isPlaying={i === activePlayer}
                        onPlayButtonClick={() => {
                            this.onPlayButtonClickFunc(i);
                        }}
                    />
                }} 
            />
        }
    };

    return WithActivePlayer;
};