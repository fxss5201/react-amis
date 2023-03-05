import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import cloneDeep from 'lodash.clonedeep';
import { addPrefixName } from '../../utils/index';
import { searchRoute } from '../../utils/router';
import { routerList } from '../../router/index';
import AmisComponent from "../../components/AmisComponent";

const LayoutTabs = ({headerHeight = '', asideMenuWidth = ''}) => {
  const location = useLocation();
  const navigate = useNavigate();
	const route = searchRoute(location.pathname, routerList[0].children);

  let localTabs = useRef()
  // localTabs = window.localStorage.getItem(addPrefixName('tabs'))
  if (!localTabs.current) {
    const homeRoute = searchRoute('/admin/test', routerList[0].children);
    localTabs.current = [
      {
        key: homeRoute.path,
        title: homeRoute.label,
        closable: false,
      }
    ]
  }
  //  else {
  //   localTabs = JSON.parse(localTabs)
  // }
  const tabsItemsKeys = localTabs.current.map(x => x.key)
  if (!tabsItemsKeys.includes(route.path)) {
    localTabs.current.push({
      key: route.path,
      title: route.label
    })
    // window.localStorage.setItem(addPrefixName('tabs'), JSON.stringify(localTabs))
  }

  const tabsSchema = {
    "name": "LayoutTabs",
    "type": "tabs",
    "draggable": true,
    "closable": true,
    "tabsMode": "line",
    "activeKey": localTabs.current.findIndex(x => x.key === location.pathname),
    "tabs": localTabs.current,
    "onSelect": (e) => {
      navigate(localTabs.current[e].key)
    },
    "onChange": (e, e12) => {
      console.log(e)
      console.log(e12)
    }
  }

  return (
    <div style={{width: '100%', height: '31px'}}>
      <div className="layout-tabs-box" style={{position: 'fixed', top: headerHeight, left: asideMenuWidth, right: 0, zIndex: 10, backgroundColor: '#fff'}}>
        <AmisComponent schema={tabsSchema} />
      </div>
    </div>
  )
}

export default LayoutTabs;
