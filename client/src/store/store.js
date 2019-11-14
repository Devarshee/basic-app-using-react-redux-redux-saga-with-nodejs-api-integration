import { createStore, applyMiddleware, combineReducers } from "redux";
import orderReducer from "../reducers/order/orderReducer";
import itemReducer from "../reducers/Items/itemsReducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../reducers/rootSaga";
import useReducer from "../reducers/user/userReducer";

// const composeEnhancers = composeWithDevTools({
//   // Specify here name, actionsBlacklist, actionsCreators and other options
// });

const rootReducer = combineReducers({
  order: orderReducer,
  items: itemReducer,
  userData: useReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
