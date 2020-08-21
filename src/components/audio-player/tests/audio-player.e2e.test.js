import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AudioPlayer from '../audio-player';

Enzyme.configure({adapter: new Adapter()});

const setUp = (prop1, prop2, prop3) => shallow(<AudioPlayer onPlayButtonClick={prop1} src={prop2} isPlaying={prop3} />);

const mock = {
    src: `src`,
    onPlayButtonClick: jest.fn(),
    isPlaying: false
};

const componentDidMountSpy = jest.spyOn(AudioPlayer.prototype, "componentDidMount");
const componentDidUpdateSpy = jest.spyOn(AudioPlayer.prototype, "componentDidUpdate");
const componentWillUnmountSpy = jest.spyOn(AudioPlayer.prototype, "componentWillUnmount");

describe(`AudioPlayer component`, () => {
    describe(`Lifecycle methods`, () => {
        let component;

        beforeEach(() => {
            jest.spyOn(window, "addEventListener");
            jest.spyOn(window, "removeEventListener");
            component = setUp(mock.onPlayButtonClick, mock.src, mock.isPlaying);
        });

        afterEach(() => {
            window.addEventListener.mockRestore();
            window.removeEventListener.mockRestore();
        });

        it(`should not call componentWillUnmount when component just mounted`, () => {
            expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
            expect(componentWillUnmountSpy).toHaveBeenCalledTimes(0);
        });

        it(`should call componentDidUpdate`, () => {
            component.setProps();
            expect(componentDidUpdateSpy).toHaveBeenCalled();
        });

        it(`should call componentWillUnmount`, () => {
            component.unmount();
            expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
        });
    });

    it(`_onPlayButtonClick click handler`, () => {
        const clickHandler = jest.fn();
        const audioPlayer = shallow(<AudioPlayer 
            onPlayButtonClick={clickHandler}
            src={`src`}
            isPlaying={false}
        />);
    
        const button = audioPlayer.find(`button`);
        button.simulate(`click`);
    
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });
});
