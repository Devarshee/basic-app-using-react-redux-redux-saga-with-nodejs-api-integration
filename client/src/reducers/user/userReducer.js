import * as actionTypes from "../../actions/actions";

const initialState = {
  items: []
};

const userReducer = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case actionTypes.FETCH_ORDER_BY_USER_SUCCESS:
      return {
        ...state,
        ordersByUser: action.ordersByUser
      };
    case actionTypes.FETCH_ORDER_BY_USER_FAILIUR:
      return {
        state
      };
    default:
      return state;
  }
};

export default userReducer;
