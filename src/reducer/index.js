import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
const appStore = combineReducers({
    items : itemsReducer
});

export default appStore;