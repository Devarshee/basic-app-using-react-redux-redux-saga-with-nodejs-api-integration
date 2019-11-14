import axios from "axios";
import { put, all, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../../actions/actions";

export function* fetchOrders() {
  try {
    debugger;
    const { data } = yield axios.get(`http://192.192.6.226:5000/api/order`);
    debugger;
    yield put({
      type: actionTypes.FETCH_ORDER_SUCCESS,
      orders: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.FETCH_ORDER_FAILIUR,
      err: err
    });
  }
}

export function* fetchOrderById(payload) {
  const { id } = payload;
  try {
    debugger;
    const { data } = yield axios.get(
      `http://192.192.6.226:5000/api/order/findItemByOrderNo/${id}`
    );
    yield put({
      type: actionTypes.FETCH_ORDER_BY_ORDER_ID_SUCCESS,
      order: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.FETCH_ORDER_BY_ORDER_ID_FAILIUR,
      err: err
    });
  }
}

export function* orderSaga() {
  debugger;
  yield all([
    takeEvery(actionTypes.FETCH_ORDER_REQUEST, fetchOrders),
    takeEvery(actionTypes.FETCH_ORDER_BY_ORDER_ID, fetchOrderById)
  ]);
}
