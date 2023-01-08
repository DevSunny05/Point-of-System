import { configureStore, applyMiddleware } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// const finalReducer = combineReducers({
//   rootReducer: rootReducer,
// });

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

const store = configureStore(
    {reducer:{
        root:rootReducer,
    }},
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
