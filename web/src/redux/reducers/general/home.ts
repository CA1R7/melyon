import { Action } from "../..";

export interface HomeState {
  colorTheme?: number;
}

export const home = (
  state: HomeState = {
    colorTheme: 0,
  },
  action: Action<HomeState>
): HomeState => {
  switch (action.type) {
    case "UPDATE_HOME_STATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
