import * as actionTypes from "../../actions/actions";

const initialState = {
  items: [],
  itemsPerOrder: {
    item: [],
    orderNumber: 101
  }
};
const itemReducer = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case actionTypes.FETCH_ITEM_TO_ORDER_SUCCESS:
      return {
        ...state,
        items: action.items
      };
    case actionTypes.FETCH_ITEM_TO_ORDER_FAILIUR:
      return {
        state
      };
    case actionTypes.ADD_ITEM_TO_ORDER_SUCCESS:
      return {
        ...state,
        items: action.items
      };
    case actionTypes.ADD_ITEM_TO_ORDER_FAILIUR:
      return {
        state
      };
    case actionTypes.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        item: action.item
      };
    case actionTypes.UPDATE_ITEM_FAILIUR:
      return {
        state
      };
    case actionTypes.DELETE_ITEM_SUCCESS:
      return {
        state
      };
    case actionTypes.DELETE_ITEM_FAILIUR:
      return {
        state
      };
    default:
      return state;
  }
};

export default itemReducer;
