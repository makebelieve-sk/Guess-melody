import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Timer from '../timer';

Enzyme.configure({adapter: new Adapter()});

const setUp = (prop1, prop2) => shallow(
    <Timer getWinTime={prop1} timeEnd={prop2} />
);

const mock = {
    getWinTime: jest.fn(),
    timeEnd: jest.fn()
};

const componentDidMountSpy = jest.spyOn(Timer.prototype, "componentDidMount");
const componentWillUnmountSpy = jest.spyOn(Timer.prototype, "componentWillUnmount");

describe(`Timer component`, () => {
    describe(`Lifecycle methods`, () => {
        let component;

        beforeEach(() => {
            jest.spyOn(window, "addEventListener");
            jest.spyOn(window, "removeEventListener");
            component = setUp(mock.getWinTime, mock.timeEnd);
        });

        afterEach(() => {
            window.addEventListener.mockRestore();
            window.removeEventListener.mockRestore();
        });

        it(`should not call componentWillUnmount when component just mounted`, () => {
            expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
            expect(componentWillUnmountSpy).toHaveBeenCalledTimes(0);
        });

        it(`should call componentWillUnmount`, () => {
            component.unmount();
            expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
        });

        it(`state of component is change correctly`, () => {
            setTimeout(() => {
                expect(component.state().minutes).toEqual('00');
            }, 5 * 60 * 1000);
        });

        it(`timeEnd prop is called`, () => {
            const instance = component.instance();
            instance.timeEnd = jest.fn();
            setTimeout(() => {
                expect(instance.timeEnd).toHaveBeenCalledTimes(1);
            }, 5 * 60 * 1000);
        });
    });
});