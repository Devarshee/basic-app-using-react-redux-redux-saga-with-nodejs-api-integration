import { fetchOrders, orderSaga } from "./order/orderSaga";
import { all } from "redux-saga/effects";
import { itemSaga } from "./Items/itemSaga";
import { userSaga } from "./user/userSaga";

export function* rootSaga() {
  yield all([
    fetchOrders(),
    userSaga(),
    itemSaga(),
    orderSaga(),
  ]);
}
