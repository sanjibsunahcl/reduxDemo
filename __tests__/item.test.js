import React from 'react';
import {create, act} from 'react-test-renderer';
import Items from '../src/screen/items';

// jest.runAllTimers();
//Snap shot test
it('Item snapshot', () => {
  const tree = create(<Items />);
  expect(tree).toMatchSnapshot();
});

test('button press', () => {
  //button press
  const tree = create(<Items />);
  const button = tree.root.findByProps({testID: 'myButton'}).props;
  act(() => button.onPress());
  const text = tree.root.findByProps({testID: 'myText'}).props;
  expect(text.children).toEqual('button pressed');
});

test('call timeout', () => {
  //to perform the asynchronous like useffect timeout etc.
  const tree = create(<Items />);

  act(() => jest.runAllTimers());
  const text = tree.root.findByProps({testID: 'timeOutText'}).props;
  // console.log('hfhjfdhjhjf' + JSON.stringify(text));
  expect(text.children).toEqual('timeout is called');
});

describe('Check count', () => {
  test('use effect set up', () => {
    const tree = create(<Items />);
    act(() => jest.runAllTimers());
    const text = tree.root.findByProps({testID: 'dataId'}).props;
    // console.log(text.children);
    expect(text.children).toEqual(20);
  });
  test('button press', () => {
    const tree = create(<Items />);
    const button = tree.root.findByProps({testID: 'countButton'}).props;
    act(() => button.onPress());
    const text = tree.root.findByProps({testID: 'countText'}).props;
    expect(text.children).toEqual(5);
  });
});
