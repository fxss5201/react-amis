"use strict";(self.webpackChunkreact_amis=self.webpackChunkreact_amis||[]).push([[2351],{22351:function(t,e,o){o.r(e),o.d(e,{version:function(){return m}});var n,i=o(51257);function a(t,e){this._bmap=t,this.dimensions=["lng","lat"],this._mapOffset=[0,0],this._api=e,this._projection=new BMap.MercatorProjection}function r(t,e){return e=e||[0,0],i.util.map([0,1],(function(o){var n=e[o],i=t[o]/2,a=[],r=[];return a[o]=n-i,r[o]=n+i,a[1-o]=r[1-o]=e[1-o],Math.abs(this.dataToPoint(a)[o]-this.dataToPoint(r)[o])}),this)}a.prototype.type="bmap",a.prototype.dimensions=["lng","lat"],a.prototype.setZoom=function(t){this._zoom=t},a.prototype.setCenter=function(t){this._center=this._projection.lngLatToPoint(new BMap.Point(t[0],t[1]))},a.prototype.setMapOffset=function(t){this._mapOffset=t},a.prototype.getBMap=function(){return this._bmap},a.prototype.dataToPoint=function(t){var e=new BMap.Point(t[0],t[1]),o=this._bmap.pointToOverlayPixel(e),n=this._mapOffset;return[o.x-n[0],o.y-n[1]]},a.prototype.pointToData=function(t){var e=this._mapOffset;return[(t=this._bmap.overlayPixelToPoint({x:t[0]+e[0],y:t[1]+e[1]})).lng,t.lat]},a.prototype.getViewRect=function(){var t=this._api;return new i.graphic.BoundingRect(0,0,t.getWidth(),t.getHeight())},a.prototype.getRoamTransform=function(){return i.matrix.create()},a.prototype.prepareCustoms=function(){var t=this.getViewRect();return{coordSys:{type:"bmap",x:t.x,y:t.y,width:t.width,height:t.height},api:{coord:i.util.bind(this.dataToPoint,this),size:i.util.bind(r,this)}}},a.prototype.convertToPixel=function(t,e,o){return this.dataToPoint(o)},a.prototype.convertFromPixel=function(t,e,o){return this.pointToData(o)},a.dimensions=a.prototype.dimensions,a.create=function(t,e){var o,r=e.getDom();return t.eachComponent("bmap",(function(t){var p,s=e.getZr().painter,m=s.getViewportRoot();if("undefined"===typeof BMap)throw new Error("BMap api is not loaded");if(n=n||function(){function t(t){this._root=t}return t.prototype=new BMap.Overlay,t.prototype.initialize=function(t){return t.getPanes().labelPane.appendChild(this._root),this._root},t.prototype.draw=function(){},t}(),o)throw new Error("Only one bmap component can exist");if(!t.__bmap){var l=r.querySelector(".ec-extension-bmap");l&&(m.style.left="0px",m.style.top="0px",r.removeChild(l)),(l=document.createElement("div")).className="ec-extension-bmap",l.style.cssText="position:absolute;width:100%;height:100%",r.appendChild(l);var c=t.get("mapOptions");c&&delete(c=i.util.clone(c)).mapType,p=t.__bmap=new BMap.Map(l,c);var d=new n(m);p.addOverlay(d),s.getViewportRootOffset=function(){return{offsetLeft:0,offsetTop:0}}}p=t.__bmap;var f=t.get("center"),u=t.get("zoom");if(f&&u){var h=p.getCenter(),y=p.getZoom();if(t.centerOrZoomChanged([h.lng,h.lat],y)){var g=new BMap.Point(f[0],f[1]);p.centerAndZoom(g,u)}}(o=new a(p,e)).setMapOffset(t.__mapOffset||[0,0]),o.setZoom(u),o.setCenter(f),t.coordinateSystem=o})),t.eachSeries((function(t){"bmap"===t.get("coordinateSystem")&&(t.coordinateSystem=o)})),o&&[o]};var p=a;i.extendComponentModel({type:"bmap",getBMap:function(){return this.__bmap},setCenterAndZoom:function(t,e){this.option.center=t,this.option.zoom=e},centerOrZoomChanged:function(t,e){var o,n,i=this.option;return o=t,n=i.center,!(o&&n&&o[0]===n[0]&&o[1]===n[1]&&e===i.zoom)},defaultOption:{center:[104.114129,37.550339],zoom:5,mapStyle:{},mapStyleV2:{},mapOptions:{},roam:!1}});function s(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}i.extendComponentView({type:"bmap",render:function(t,e,o){var n=!0,a=t.getBMap(),r=o.getZr().painter.getViewportRoot(),p=t.coordinateSystem,m=function(e,i){if(!n){var a=r.parentNode.parentNode.parentNode,s=[-parseInt(a.style.left,10)||0,-parseInt(a.style.top,10)||0],m=r.style,l=s[0]+"px",c=s[1]+"px";m.left!==l&&(m.left=l),m.top!==c&&(m.top=c),p.setMapOffset(s),t.__mapOffset=s,o.dispatchAction({type:"bmapRoam",animation:{duration:0}})}};function l(){n||o.dispatchAction({type:"bmapRoam",animation:{duration:0}})}a.removeEventListener("moving",this._oldMoveHandler),a.removeEventListener("moveend",this._oldMoveHandler),a.removeEventListener("zoomend",this._oldZoomEndHandler),a.addEventListener("moving",m),a.addEventListener("moveend",m),a.addEventListener("zoomend",l),this._oldMoveHandler=m,this._oldZoomEndHandler=l;var c=t.get("roam");c&&"scale"!==c?a.enableDragging():a.disableDragging(),c&&"move"!==c?(a.enableScrollWheelZoom(),a.enableDoubleClickZoom(),a.enablePinchToZoom()):(a.disableScrollWheelZoom(),a.disableDoubleClickZoom(),a.disablePinchToZoom());var d=t.__mapStyle,f=t.get("mapStyle")||{},u=JSON.stringify(f);JSON.stringify(d)!==u&&(s(f)||a.setMapStyle(i.util.clone(f)),t.__mapStyle=JSON.parse(u));var h=t.__mapStyle2,y=t.get("mapStyleV2")||{},g=JSON.stringify(y);JSON.stringify(h)!==g&&(s(y)||a.setMapStyleV2(i.util.clone(y)),t.__mapStyle2=JSON.parse(g)),n=!1}});i.registerCoordinateSystem("bmap",p),i.registerAction({type:"bmapRoam",event:"bmapRoam",update:"updateLayout"},(function(t,e){e.eachComponent("bmap",(function(t){var e=t.getBMap(),o=e.getCenter();t.setCenterAndZoom([o.lng,o.lat],e.getZoom())}))}));var m="1.0.0"}}]);
//# sourceMappingURL=2351.e6d14a55.chunk.js.map