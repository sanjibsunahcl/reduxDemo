import React from 'react';
import CounterTest from '../src/screen/reduxTest/Counter';
import {Provider, connect} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../src/testRedux/reducer/counterReducer';

function renderWithRedux(renderComponent) {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

  return render(<Provider store={store}>{renderComponent}</Provider>);
}

describe('Testing counter page', () => {
  it('renders the component correctly', () => {
    renderWithRedux(<CounterTest />);
  });

  it('Should start with the current count of 0', () => {
    const {getByText, getByTestId} = renderWithRedux(<CounterTest />);

    fireEvent.press(getByText('+'));
    console.log('fjhdfhgjh' + getByTestId('count-value').props.children);
    expect(getByTestId('count-value').props.children).toBe(1);

    // const count = getByText('0');

    // expect(count).not.toBeNull();
  });
});
