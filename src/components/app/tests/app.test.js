import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { App } from '../app';

Enzyme.configure({ adapter: new Adapter() });

const mock = {
    renderScreen: jest.fn(),
    step: 0
};

it(`App correctly renders after relaunch`, () => {
    const tree = renderer
        .create(<App 
            renderScreen={mock.renderScreen}
            step={mock.step}
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});