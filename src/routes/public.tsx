import Home from "@/pages/home";
import { type Route as CustomRoute } from "@/types/route.type";

export const publicRoutes: CustomRoute[] = [
  {
    element: <Home />,
    path: "/",
  },
];
