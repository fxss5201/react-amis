import { createHashRouter } from "react-router-dom";
import getRouteElement from "./getRouteElement";

import AllLayout from "../layout/AllLayout";
import HomeLayout from "../layout/HomeLayout";
import PageOutlet from "../pages/PageOutlet";
import LoginPage from "../pages/login/loginPage";
import Register from "../pages/login/Register";
import ResetPassword from "../pages/login/ResettPassword";
import test from "../pages/test";
import about from "../pages/about";
import schemaApi from "../pages/schemaApi";
import unfold from '../pages/unfold.json'

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
        },
        {
          path: "/admin/unfold",
          redirect: "/admin/unfold/one",
          label: "测试展开",
          icon: "fa-regular fa-folder-open",
          element: <PageOutlet />,
          children: [
            {
              path: "/admin/unfold/one",
              label: "展开",
              element: getRouteElement(unfold),
            }
          ]
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
    },
    {
      path: "/resetpassword",
      label: "重置密码",
      element: <ResetPassword />,
    },
  ]
}]

const router = createHashRouter(routerList);

export default router;