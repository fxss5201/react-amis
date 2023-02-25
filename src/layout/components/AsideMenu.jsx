import AmisComponent from "../../components/AmisComponent";
import { routerList } from "../../router";
import { useSelector } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import { searchShowMenuRoutes, showMenuRoutesToMenuItems, showMenuRoutesFilterAccess } from '../../utils/router';
import { useLocation } from "react-router-dom";

const AsideMenu = () => {
  const location = useLocation();
	const userInfo = useSelector(state => state.userInfo.value);
  let sideMenuList = searchShowMenuRoutes(routerList[0].children);
  sideMenuList = sideMenuList[0]?.children;
  const sideMenuListClone = cloneDeep(sideMenuList);
	const sideMenuListFilterAccess = showMenuRoutesFilterAccess(sideMenuListClone, userInfo.access);
	const sideMenuItems = showMenuRoutesToMenuItems(sideMenuListFilterAccess);

  const activeAndUnfolded = (list) => {
    return list.map(x => {
      if (x.children) x.children = activeAndUnfolded(x.children)
      return {
        ...x,
        active: location.pathname === x.path,
        unfolded: location.pathname.includes(x.path)
      }
    })
  }

  const asideMenuSchema = {
    "type": "nav",
    "stacked": true,
    "className": "w-md",
    "links": activeAndUnfolded(sideMenuItems)
  }

  return <AmisComponent schema={asideMenuSchema} />;
}

export default AsideMenu;
