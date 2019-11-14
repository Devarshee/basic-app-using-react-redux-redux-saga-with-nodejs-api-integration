import axios from "axios";
import { put, all, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../../actions/actions";

export function* getOrdersByUser(payload) {
  debugger;
  const { id } = payload;
  try {
    debugger;
    const { data } = yield axios.get(
      `http://192.192.6.226:5000/api/user/${id}`,
    );

    yield put({
      type: actionTypes.FETCH_ORDER_BY_USER_SUCCESS,
      ordersByUser: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.FETCH_ORDER_BY_USER_FAILIUR,
      err: err
    });
  }
}

export function* userSaga() {
  debugger;
  yield all([takeEvery(actionTypes.FETCH_ORDER_BY_USER_REQUEST, getOrdersByUser)]);
}
