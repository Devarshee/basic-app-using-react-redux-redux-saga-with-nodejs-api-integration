import axios from "axios";
import { put, all, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../../actions/actions";

export function* fetchItems() {
  debugger;
  try {
    const { data } = yield axios.get(`http://192.192.6.226:5000/api/item`);
    yield put({
      type: actionTypes.FETCH_ITEM_TO_ORDER_SUCCESS,
      items: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.FETCH_ITEM_TO_ORDER_FAILIUR,
      err: err
    });
  }
}

export function* addItems(action) {
  const { orderId } = action.orderItem
  debugger;
  try {
    const { data } = yield axios.post(
      `http://192.192.6.226:5000/api/item/addItemToOrder`,
      action
    );

    yield put({
      type: actionTypes.ADD_ITEM_TO_ORDER_SUCCESS,
      items: data.data
    });

    yield put({
      type: actionTypes.FETCH_ORDER_BY_ORDER_ID,
      id: orderId
    });

  } catch (err) {
    yield put({
      type: actionTypes.ADD_ITEM_TO_ORDER_FAILIUR,
      err: err
    });
  }
}

export function* updateItems(payload) {
  debugger;
  const { id, units } = payload;
  const updateData = { quantity: units };
  try {
    debugger;
    const { data } = yield axios.put(
      `http://192.192.6.226:5000/api/item/updateItem/${id}`,
      updateData
    );

    yield put({
      type: actionTypes.UPDATE_ITEM_SUCCESS,
      item: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.UPDATE_ITEM_FAILIUR,
      err: err
    });
  }
}

export function* deleteItems(action) {
  const id = action.itemId;
  try {
    const data = yield axios.delete(
      `http://192.192.6.226:5000/api/item/removeItem/${id}`
    );
    yield put({
      type: actionTypes.DELETE_ITEM_SUCCESS,
      itemId: data.data
    });
  } catch (err) {
    yield put({
      type: actionTypes.DELETE_ITEM_FAILIUR,
      err: err
    });
  }
}

export function* itemSaga() {
  debugger;
  yield all([takeEvery(actionTypes.FETCH_ITEM_TO_ORDER_REQUEST, fetchItems),
    takeEvery(actionTypes.UPDATE_ITEM_REQUEST, updateItems),
    takeEvery(actionTypes.ADD_ITEM_TO_ORDER_REQUEST, addItems),
    takeEvery(actionTypes.DELETE_ITEM_REQUEST, deleteItems)
  ]);
}
