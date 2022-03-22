import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import ItemsEnzyme from '../src/screen/itemEnzyme';

import renderer, {act} from 'react-test-renderer';

// This test just uses Jest snapshot testing
it('renders correctly, test using Jest', () => {
  renderer.create(<ItemsEnzyme />);
});

// Using Jest + Enzyme
describe('<ItemsEnzyme />', () => {
  it('renders correctly, test using Jest + Enzyme', () => {
    expect(shallow(<ItemsEnzyme />)).toMatchSnapshot();
  });
});

describe('Check view item', () => {
  test('check view', () => {
    let wrapper = shallow(<ItemsEnzyme />);
    expect(
      wrapper.findWhere(node => node.prop('testID') === 'todo-item'),
    ).toBeTruthy();
  });
});

//to update the state
describe('Check Count test', () => {
  test('check count set up', () => {
    // const onCountChange = jest.fn();
    let wrapper = renderer.create(<ItemsEnzyme />);
    const btn = wrapper.root.findByProps({testID: 'myButton'}).props;
    act(() => btn.onPress());
    const text = wrapper.root.findByProps({testID: 'countText'}).props;
    // console.log('hgghdhgdhh' + JSON.stringify(text.children[1]));
    // onCountChange={onCountChange}
    expect(text.children[1]).toEqual(3);
  });
});
