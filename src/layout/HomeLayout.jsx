import { Outlet, ScrollRestoration } from "react-router-dom";
import AsideMenu from "./components/AsideMenu";
import HeaderRight from "./components/HeaderRight";

const Layout = () => {
  const headerHeight = '51px';
  const asideMenuWidth = '241px';

  return (
    <>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
      <div className="w-screen">
        <div style={{height: headerHeight}}>
          <div className="box-border px-8 fixed top-0 left-0 right-0 z-30 border-0 border-b border-gray-200 border-solid flex items-center justify-between" style={{height: headerHeight}}>
            <div className="bg-gray-200 w-32 h-8"></div>
            <HeaderRight />
          </div>
        </div>
        <div className="flex items-stretch" style={{minHeight: `calc(100vh - ${headerHeight})`}}>
          <div className="flex-grow-0 flex-shrink-0" style={{width: asideMenuWidth}}>
            <div className="overflow-auto border-0 border-r border-gray-200 border-solid fixed left-0 bottom-0 z-30" style={{width: asideMenuWidth, top: headerHeight}}>
              <AsideMenu />
            </div>
          </div>
          <div className="flex-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout;
