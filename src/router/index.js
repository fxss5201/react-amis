import { createHashRouter } from "react-router-dom";
import getRouteElement from "./getRouteElement";

import AllLayout from "../layout/AllLayout";
import HomeLayout from "../layout/HomeLayout";
import LoginPage from "../pages/login/loginPage";
import Register from "../pages/login/Register";
import test from "../pages/test";
import about from "../pages/about";
import schemaApi from "../pages/schemaApi";

export const routerList = [{
  path: "/",
  element: <AllLayout />,
  redirect: "/admin",
  children: [
    {
      path: "/admin",
      redirect: "/admin/test",
      element: <HomeLayout />,
      children: [
        {
          path: "/admin/test",
          label: "test",
          icon: "fa-solid fa-house",
          requiresAuth: true,
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
    },
    {
      path: "/login",
      label: "登录",
      element: <LoginPage />,
    },
    {
      path: "/register",
      label: "注册",
      element: <Register />,
    }
  ]
}]

const router = createHashRouter(routerList);

export default router;