import { ReactElement } from "react";

export type RouteConfig = {
  uuid: string;
  path: string;
  element: () => React.ReactNode;
};

export const enum AccessMode {
  Always,
  LoggedIn,
  Guest,
}

export type ProtectedRouteProps = {
  children: ReactElement;
  mode: AccessMode;
  redirectTo?: string;
};
