import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';

import { LoseScreen } from '../lose-screen';
import history from '../../../history';

Enzyme.configure({ adapter: new Adapter() });

const setUp = (prop1, prop2) => shallow(
    <LoseScreen endTime={prop1} reset={prop2} />
);

const mock = {
    endTime: false,
    reset: jest.fn()
};

describe(`LoseScreen component`, () => {
    let component;

    beforeEach(() => {
        component = setUp(mock.endTime, mock.reset);
    });

    it(`should contain div wrapper`, () => {
        const wrapper = component.find('.fail-tries');
        expect(wrapper.length).toBe(1);
    });

    it(`LoseScreen correctly renders after relaunch`, () => {
        const tree = renderer  
            .create(
                <Router history={history}>
                    <LoseScreen 
                        endTime={mock.endTime}
                        reset={mock.reset}
                    />
                </Router>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});