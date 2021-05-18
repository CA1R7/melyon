import { Action } from "../..";

export interface LoaderState {
  troubleMessage?: string;
}

export const loader = (
  state: LoaderState = {
    troubleMessage: "",
  },
  action: Action<LoaderState>
): LoaderState => {
  switch (action.type) {
    case "UPDATE_LOADER_STATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
