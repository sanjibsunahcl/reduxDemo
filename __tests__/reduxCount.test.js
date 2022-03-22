import React from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import ConnectedCounter from '../src/screen/reduxCountTest';
import testReducer from '../src/testRedux/testReducer';

function renderWithRedux(
  ui,
  {initialState, store = createStore(testReducer, initialState)} = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

test('can render with redux with defaults', () => {
  const {getByTestId, getByText} = renderWithRedux(<ConnectedCounter />);
  fireEvent.press(getByText('+'));
  expect(getByTestId('count-value').props.children).toBe(1);
});

test('can render with redux with custom initial state', () => {
  const {getByTestId, getByText} = renderWithRedux(<ConnectedCounter />, {
    initialState: {count: 3},
  });
  fireEvent.press(getByText('-'));
  console.log(
    'test count decr' + JSON.stringify(getByTestId('count-value').props),
  );
  expect(getByTestId('count-value').props.children).toBe(2);
});

test('can render with redux with custom store', () => {
  const store = createStore(() => ({count: 100}));
  const {getByTestId, getByText} = renderWithRedux(<ConnectedCounter />, {
    store,
  });
  fireEvent.press(getByText('+'));
  expect(getByTestId('count-value').props.children).toBe(100);
  fireEvent.press(getByText('-'));
  //to get the count value
  console.log(
    'test count value' + JSON.stringify(getByTestId('count-value').props),
  );
  expect(getByTestId('count-value').props.children).toBe(100);
});
