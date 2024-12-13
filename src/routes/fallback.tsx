import { Route as CustomRoute } from "../types/route.type";

export const fallbackRoute: CustomRoute[] = [
  {
    path: "*",
    element: <div>Not Found</div>,
  },
];
