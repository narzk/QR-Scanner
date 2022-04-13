import {combineReducers} from 'redux';
import {SCANNER} from '../constants';
const initialState = {
  data: {},
};
const scannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCANNER:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};
export default combineReducers({
  scanner: scannerReducer,
});
