import {createStore, combineReducers} from 'redux';
import scannerReducer from '../android/app/redux/reducers/scannerReducer';
const rootReducer = combineReducers({data: scannerReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
