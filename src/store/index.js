import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import appStore from "../reducer";

const store = createStore(appStore, applyMiddleware(thunk));

export default store;