import React from 'react';
import renderer from 'react-test-renderer';
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

import AudioPlayer from '../audio-player';

// Enzyme.configure({ adapter: new Adapter() });

// const setUp = (prop1, prop2, prop3) => shallow(<AudioPlayer onPlayButtonClick={prop1} src={prop2} isPlaying={prop3} />);

// const mock = {
//     src: `src`,
//     onPlayButtonClick: jest.fn(),
//     isPlaying: false
// };

describe(`AudioPlayer component`, () => {
    // let component;

    // beforeEach(() => {
    //     component = setUp(mock.onPlayButtonClick, mock.src, mock.isPlaying);
    // });

    // it(`should contain section wrapper`, () => {
    //     const wrapper = component.find('.wrapper-audioplayer');
    //     expect(wrapper.length).toBe(1);
    // });

    it(`AudioPlayer correctly renders after relaunch`, () => {
        const tree = renderer  
            .create(<AudioPlayer 
                onPlayButtonClick={jest.fn()}
                src={`src`}
                isPlaying={false}
            />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
