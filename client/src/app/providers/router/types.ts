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
