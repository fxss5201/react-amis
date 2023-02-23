import { useLocation } from "react-router-dom";
import AmisComponent from "../../components/AmisComponent";
import { routeList } from "../../router";

const AsideMenu = () => {
  const location = useLocation();

  const routeListToLinks = (routeList) => {
    return routeList.map(x => {
      let res = {
        ...x,
        to: x.path
      }
      if (x.children) {
        res.children = routeListToLinks(x.children)
      }
      if (location.pathname === x.path) res.active = true
      return res
    })
  }

  const asideMenuSchema = {
    "type": "nav",
    "stacked": true,
    "className": "w-md",
    "links": routeListToLinks(routeList)
  }

  return <AmisComponent schema={asideMenuSchema} />;
}

export default AsideMenu;
