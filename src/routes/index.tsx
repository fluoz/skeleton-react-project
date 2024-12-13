import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import { fallbackRoute } from "./fallback";
import { type Route as CustomRoute } from "@/types/route.type";
import ProtectedRoute from "@/components/auth/protected-route";

export function AppRoutes() {
  const parseRouteObjects = (
    routes: CustomRoute[],
    isProtected = false
  ): RouteObject[] => {
    return routes.map((route) => ({
      path: route.path,
      element: isProtected ? (
        <ProtectedRoute roles={route.roles}>{route.element}</ProtectedRoute>
      ) : (
        route.element
      ),
    }));
  };

  const publicRouteObjects = parseRouteObjects(publicRoutes);
  const privateRouteObjects = parseRouteObjects(privateRoutes, true);
  const fallbackRouteObjects = parseRouteObjects(fallbackRoute);

  const routes = [
    ...publicRouteObjects,
    ...privateRouteObjects,
    ...fallbackRouteObjects,
  ];

  const allRoutes = useRoutes(routes);

  return <React.Fragment> {allRoutes} </React.Fragment>;
}
