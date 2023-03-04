import { createHashRouter } from "react-router-dom";
import { getRouteElementBySchema, getRouteElementBySchemaApi } from "./getRouteElement";

import AllLayout from "../layout/AllLayout";
import HomeLayout from "../layout/HomeLayout";
import PageOutlet from "../pages/PageOutlet";
import LoginPage from "../pages/login/loginPage";
import Register from "../pages/login/Register";
import ResetPassword from "../pages/login/ResettPassword";
import test from "../pages/test";
import about from "../pages/about";
// import schemaApi from "../pages/schemaApi";
import unfold from '../pages/unfold.json'

// 路由配置列表，单个路由 element/schema/schemaApi 只能指定一个
const routerConfig = [{
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
          element: getRouteElementBySchema(test),
        },
        {
          path: "/admin/about",
          label: "about",
          icon: "fa-solid fa-bars",
          schema: about,
        },
        {
          path: "/admin/schemaApi",
          label: "schemaApi",
          icon: "fa-solid fa-bars",
          schemaApi: "/api/schema",
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
              schema: unfold,
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

// 将路由配置列表生成路由列表
const configToList = (arr) => {
  return arr.map(item => {
    let res = item
    if (!item.element) {
      if (item.schema) {
        // 配置 schema
        res.element = getRouteElementBySchema(item.schema)
      } else if (item.schemaApi) {
        // 配置 schemaApi
        res.element = getRouteElementBySchemaApi(item.schemaApi)
      }
    }
    if (item.children) {
      res.children = configToList(item.children)
    }
    return res
  })
}

export const routerList = configToList(routerConfig);

const router = createHashRouter(routerList);

export default router;