/**
 * redux-root
 */

import { compose, createStore, applyMiddleware } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { MainReducers } from "./reducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export const store = createStore(
  MainReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export type StateInterface = ReturnType<typeof store.getState>;

export interface Action<T = string> {
  type: "UPDATE_ROUTER_HANDLER" | "UPDATE_HOME_STATE";
  payload: Partial<T>;
}

export type Dispatch<A> = ThunkDispatch<
  StateInterface,
  Record<string, unknown>,
  Action<A>
>;
