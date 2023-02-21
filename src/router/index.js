import { createHashRouter } from "react-router-dom";
import getRouteElement from "./getRouteElement";

import Layout from "../layout/Layout";
import test from "../pages/test";
import about from "../pages/about";

export const routerList = [
  {
    path: "/test",
    element: getRouteElement(test),
  },
  {
    path: "/about",
    element: getRouteElement(about),
  }
]

const router = createHashRouter([{
  path: "/",
  element: <Layout />,
  children: routerList
}]);

export default router;