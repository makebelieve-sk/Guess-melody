import React, { Component } from 'react';

import './audio-player.css';

type AudioPlayerProps = {
    src: string,
    isPlaying: boolean,
    onPlayButtonClick: () => any
};

type AudioPlayerState = {
    isLoading: boolean,
    isPlaying: boolean
};

export default class AudioPlayer extends Component<AudioPlayerProps, AudioPlayerState> {
    private _audio: HTMLAudioElement;
    constructor(props: AudioPlayerProps) {
        super(props);
        
        this.state = {
            isLoading: true,
            isPlaying: false
        };
        
        this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
    };

    componentDidMount() {
        const { src } = this.props;
        this._audio = new Audio(src);

        this._audio.oncanplaythrough = () => {
            this.setState({
                isLoading: false
            });
        };
        this._audio.onplay = () => {
            this.setState({
                isPlaying: true
            });
        };
        this._audio.onpause = () => {
            this.setState({
                isPlaying: false
            });
        };
    };

    componentDidUpdate() {
        if (this.props.isPlaying) {
            this._audio.play();
        } else {
            this._audio.pause();
        }
    };

    componentWillUnmount() {
        this._audio.oncanplaythrough = null;
        this._audio.onplay = null;
        this._audio.onpause = null;
        this._audio.ontimeupdate= null;
        this._audio.src = ``;
        this._audio = null;
    }

    _onPlayButtonClick() {
        this.props.onPlayButtonClick();
        this.setState({
            isPlaying: !this.state.isPlaying
        });
    };

    render() {
        const { isLoading, isPlaying } = this.state;

        return (
            <>
                <button 
                    className={`track_button track_button-${isPlaying ? `pause` : `play`}`} 
                    type="button" 
                    disabled={isLoading} 
                    onClick={this._onPlayButtonClick}/>
                <div className="track_status">
                    <audio />
                </div>
            </>
        );
    }
};