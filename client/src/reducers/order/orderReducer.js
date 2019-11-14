import * as actionTypes from "../../actions/actions";

const initialState = {
  orders: []
};

const orderReducer = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders
      };
    case actionTypes.FETCH_ORDER_REQUEST:
      return {
        state
      };
    case actionTypes.FETCH_ORDER_FAILIUR:
      return {
        state
      };
    case actionTypes.FETCH_ORDER_BY_ORDER_ID:
      return {
        ...state,
        orderId: action.id
      };
    case actionTypes.FETCH_ORDER_BY_ORDER_ID_SUCCESS:
      return {
        ...state,
        orderById: action.order
      };
    case actionTypes.FETCH_ORDER_BY_ORDER_ID_FAILIUR:
      return {
        state
      };
    default:
      return state;
  }
};

export default orderReducer;
