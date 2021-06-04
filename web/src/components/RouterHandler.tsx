import React, { FC, ReactElement, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, RouteProps } from "react-router-dom";
import { RoutersHandlerState } from "../redux/reducers/general/router-handler";
import { StateInterface, Dispatch } from "../redux";
import { Loader } from "./pages/Loader";
import { Home } from "./pages/Home";
import { LoaderState } from "../redux/reducers/general/loader";

const routes: RouteProps[] = [
  {
    component: Home,
    path: "/",
    exact: true,
  },
];

export interface LinkType {
  name: string;
  ico: string;
  href: string;
}

export interface ColorType {
  name_color: string;
  hex_color: string;
  gradient_css: string[];
  version: string;
  preview_image: string;
  [key: string]: any; // eslint-disable-line
}

export interface ExtensionType {
  status?: boolean;
  code?: number;
  name: string;
  extension_pub: string;
  badges: string[];
  g_version: string | number;
  versions: ColorType[];
  links: LinkType[];
  features: string[];
  repoGithub: string;
  [key: string]: any; // eslint-disable-line
}

const ENDPOINT: string =
  process.env.NODE_ENV === "production"
    ? "https://melyon-server.herokuapp.com"
    : "http://localhost:8080";

export const RouterHandler: FC = (): ReactElement => {
  const dispatch = useDispatch<Dispatch<RoutersHandlerState & LoaderState>>();
  const { loaderScreen } = useSelector<StateInterface, RoutersHandlerState>(
    (state) => state.routersHandler
  );
  useEffect(() => {
    console.log(`CLIENT: Trying to fetch: ${ENDPOINT}`);
    axios
      .request<ExtensionType>({
        url: `${ENDPOINT}/extension`,
        method: "GET",
      })
      .then(({ data }) => {
        try {
          if (
            data &&
            Object.prototype.hasOwnProperty.call(data, "status") &&
            data.status
          ) {
            setTimeout(() => {
              dispatch({
                type: "UPDATE_ROUTER_HANDLER",
                payload: {
                  extension: data,
                  loaderScreen: false,
                },
              });
            }, 3000);
          } else throw new Error("invalid data");
        } catch (e) {
          dispatch({
            type: "UPDATE_LOADER_STATE",
            payload: {
              troubleMessage: e || "something went worng on API connection",
            },
          });
          console.log(e);
        }
      })
      .catch(console.error);
  }, [dispatch]);
  if (loaderScreen === true) return <Loader />;
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, i) => (
          <Route {...route} key={`route-${i}`} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};
