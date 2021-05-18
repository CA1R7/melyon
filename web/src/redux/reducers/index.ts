/**
 * reducers-redux-root
 */

import { combineReducers } from "redux";

import { routersHandler } from "./general/router-handler";
import { loader } from "./general/loader";
import { home } from "./general/home";

export const MainReducers = combineReducers({
  routersHandler,
  home,
  loader,
});
