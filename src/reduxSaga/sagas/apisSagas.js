import {put, takeLatest, call} from 'redux-saga/effects';
import * as apisAction from '../actions/apisAction';
import * as constants from '../constants';
import ApiUtils from '../../utils/apiUtils';

/**
 * watcher
 */
function* actionWatcher() {
  yield takeLatest(constants.GET_RESPONSE_DATA, getResponseData);
}


/**
 * handle response data
 *
 */
function* getResponseData() {
  yield put(apisAction.setResponseLoaderAction(true));
  try {
    const response = yield ApiUtils.get('http://reactnative.dev/movies.json');
    console.log('api log response', response);
    // if (response.success) {
    yield put(apisAction.setactionApiData(response));
    // } else {
    //   customAlert('Req Failed', response.message);
    //   yield put(AuthAction.setactionApiData(false));
    // }
  } catch (error) {
    console.log('getMarketingHandler error', error);
    yield put(apisAction.setResponseLoaderAction(false));
  }
}

export default [actionWatcher];
