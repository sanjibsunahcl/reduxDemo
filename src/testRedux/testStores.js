import {createStore} from 'redux';
import testReducer from '../testRedux/testReducer';

export default createStore({
  reducer: {
    counter: testReducer,
  },
});
