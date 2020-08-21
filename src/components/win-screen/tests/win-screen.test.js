import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';

import { WinScreen } from '../win-screen';
import history from '../../../history';

Enzyme.configure({ adapter: new Adapter() });

const setUp = (prop1, prop2, prop3, prop4, prop5, prop6) => shallow(
    <WinScreen isAuthorization={prop1} mistakes={prop2} step={prop3} minutes={prop4} seconds={prop5} reset={prop6} />
);

const mock = {
    isAuthorization: false, 
    mistakes: 0,
    step: 0,
    minutes: '01',
    seconds: '01',
    reset: jest.fn()
};

describe(`WinScreen component`, () => {
    let component;

    beforeEach(() => {
        component = setUp(mock.isAuthorization, mock.mistakes, mock.step, mock.timeEnd, mock.seconds, mock.reset);
    });

    it(`should contain div wrapper`, () => {
        const wrapper = component.find('.result-success');
        expect(wrapper.length).toBe(1);
    });

    it(`WinScreen correctly renders after relaunch`, () => {
        const tree = renderer  
            .create(
                <Router history={history}><WinScreen 
                    isAuthorization={mock.isAuthorization}
                    mistakes={mock.mistakes}
                    step={mock.step}
                    timeEnd={mock.timeEnd}
                    seconds={mock.seconds}
                    reset={mock.reset}
                />
                </Router>
            )
            .toJSON();
    
        expect(tree).toMatchSnapshot();
    });
});