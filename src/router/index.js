import { createHashRouter } from "react-router-dom";
import getRouteElement from "./getRouteElement";

import HomeLayout from "../layout/HomeLayout";
import test from "../pages/test";
import about from "../pages/about";
import schemaApi from "../pages/schemaApi";

export const routeList = [
  {
    path: "/admin/test",
    label: "test",
    icon: "fa-solid fa-house",
    element: getRouteElement(test),
  },
  {
    path: "/admin/about",
    label: "about",
    icon: "fa-solid fa-bars",
    element: getRouteElement(about),
  },
  {
    path: "/admin/schemaApi",
    label: "schemaApi",
    icon: "fa-solid fa-bars",
    element: getRouteElement(schemaApi),
  }
]

const router = createHashRouter([{
  path: "/admin",
  element: <HomeLayout />,
  children: routeList
}]);

export default router;