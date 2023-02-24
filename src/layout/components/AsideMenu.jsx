import AmisComponent from "../../components/AmisComponent";
import { routerList } from "../../router";
import { useSelector } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import { searchShowMenuRoutes, showMenuRoutesToMenuItems, showMenuRoutesFilterAccess } from '../../utils/router';

const AsideMenu = () => {
	const userInfo = useSelector(state => state.userInfo.value);
  let sideMenuList = searchShowMenuRoutes(routerList[0].children);
  sideMenuList = sideMenuList[0]?.children;
  const sideMenuListClone = cloneDeep(sideMenuList);
	const sideMenuListFilterAccess = showMenuRoutesFilterAccess(sideMenuListClone, userInfo.access);
	const sideMenuItems = showMenuRoutesToMenuItems(sideMenuListFilterAccess);

  const asideMenuSchema = {
    "type": "nav",
    "stacked": true,
    "className": "w-md",
    "links": sideMenuItems
  }

  return <AmisComponent schema={asideMenuSchema} />;
}

export default AsideMenu;
