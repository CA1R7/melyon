import { Action } from "../..";
import { ExtensionType } from "../../../components/RouterHandler";

export interface RoutersHandlerState {
  loaderScreen: boolean;
  extension?: ExtensionType;
}

export const routersHandler = (
  state: RoutersHandlerState = {
    loaderScreen: true,
  },
  action: Action<RoutersHandlerState>
): RoutersHandlerState => {
  switch (action.type) {
    case "UPDATE_ROUTER_HANDLER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
