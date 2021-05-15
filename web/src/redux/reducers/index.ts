/**
 * reducers-redux-root
 */

import { combineReducers } from "redux";

import { routersHandler } from "./general/router-handler";
import { home } from "./general/home";

export const MainReducers = combineReducers({
  routersHandler,
  home,
});
