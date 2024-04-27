import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { articleReducer } from "../reducers/articleReducer";

const rootReducer = combineReducers({
  number: () => "1",
  articles: articleReducer,
});

const middlewares = [thunk];

const middleware = composeWithDevTools(applyMiddleware(...middlewares));

const initalState = {};
const store = createStore(rootReducer, initalState, middleware);

export default store;
