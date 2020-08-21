import React, { PureComponent } from 'react';

import './timer.css';

type TimerProps = {
    getWinTime: (minutes: string | number, seconds: string | number) => any,
    timeEnd: () => any
};

type TimerState = {
    minutes: string | number,
    seconds: string | number
};

export default class Timer extends PureComponent<TimerProps, TimerState> {
    x: any;
    now: any;
    time: any;
    deadline: any;
    classDot: string;
    classAlarmSecs: string;
    classAlarmMins: string;

    constructor(props: TimerProps) {
        super(props);
        
        this.state = {
            minutes: '05',
            seconds: '00'
        };

        this.x = null;
        this._timer = this._timer.bind(this);
        this._blinking = this._blinking.bind(this);
        this.now = null
        this.time = null
        this.deadline = null;
        this.classDot = 'timer_dots';
        this.classAlarmSecs = 'timer_secs';
        this.classAlarmMins = 'timer_mins';
    };

    _timer() {
        let newNow = new Date().getTime();
        this.now = newNow;
        let diff = this.deadline - this.now;
        
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.round((diff % (1000 * 60)) / 1000);
        
        this._blinking();        

        if (minutes <= 10) {
            this.setState({ minutes: '0' + minutes, seconds });
        }

        if (seconds < 10) {
            this.setState({ minutes, seconds: '0' + seconds });
        }

        if (minutes <= 10 && seconds < 10) {
            this.setState({ minutes: '0' + minutes, seconds: '0' + seconds });
        }

        if (seconds === 60) {
            this.setState({ minutes: '0' + minutes, seconds: '00' });
        }

        if (diff <= 0) {
            clearInterval(this.x);
            this.setState({ minutes: '00', seconds: '00' });
        }

        if (minutes === 0 && seconds <= 11) {
            this.classAlarmMins += ' alarm';
            this.classAlarmSecs += ' alarm';
        }
    };

    _blinking() {
        let newBlink = new Date().getSeconds();
        

        if (newBlink % 2 !== 0) {
            this.classDot += ' timer_dots-inactive';
        } else {
            this.classDot += ' timer_dots-active';
        }
    };

    componentDidMount() { 
        this.now = new Date().getTime();
        this.time = 5 * 60 * 1000;
        this.deadline = this.now + this.time;
        this.x = setInterval(this._timer, 1000);
        
    };

    componentWillUnmount() {
        const { minutes, seconds } = this.state;
        this.props.getWinTime(minutes, seconds);
        clearInterval(this.x);
        this.setState({ minutes: '00', seconds: '00' });
    }

    render() {
        const { minutes, seconds } = this.state;

        if (minutes === '00' && seconds === '00') {
            this.props.timeEnd();
        }

        return (
            <div className="timer_value">
                <span className={this.classAlarmMins}>{ minutes }</span>
                <span className={this.classDot}>:</span>
                <span className={this.classAlarmSecs}>{ seconds }</span>
            </div>
        );
    }
};