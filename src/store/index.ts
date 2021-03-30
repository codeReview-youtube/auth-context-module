import { createStore, combineReducers } from "redux";
import todosReducer from "./todosReducer";

export default createStore(
  combineReducers({
    todoState: todosReducer
  })
);
