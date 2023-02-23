import AmisComponent from "../../components/AmisComponent";

const HeaderRight = () => {
  const headerRightSchema = [
    {
      "type": "select",
      "name": "lange",
      "value": "zh-CN",
      "label": "",
      "className": "m-b-none",
      "options": [
        {
          "value": "zh-CN",
          "label": "中文"
        },
        {
          "value": "en-US",
          "label": "English"
        }
      ]
    },
    {
      "type": "dropdown-button",
      "label": "下拉菜单",
      "className": "ml-2",
      "icon": "fa fa-user",
      "buttons": [
        {
          "type": "button",
          "label": "退出登录",
          "actionType": "dialog",
          "dialog": {
            "confirmMode": false,
            "title": "提示",
            "body": "对，你刚点击了！"
          }
        }
      ]
    }
  ]
  return <div className="flex items-center">
    <AmisComponent schema={headerRightSchema} />
  </div>;
}

export default HeaderRight;
