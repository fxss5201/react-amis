import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorageState } from 'ahooks';
import AmisComponent from "../../components/AmisComponent";
import { changeLocale } from '../../store/locale';
import { addPrefixName } from '../../utils/index';

const HeaderRight = () => {
  const locale = useSelector(state => state.locale.value);
  const localeList = useSelector(state => state.locale.list);
  const [, setLocaleStorage] = useLocalStorageState(addPrefixName('locale'));
	const dispatch = useDispatch();
  const changeLocaleEvent = (val) =>  {
		dispatch(changeLocale(val));
		setLocaleStorage(val);
	};

  const headerRightSchema = [
    {
      "type": "dropdown-button",
      "label": localeList.find(x => x.value === locale).label,
      "icon": "fa-solid fa-language",
      "closeOnClick": true,
      "buttons": [
        {
          "type": "button",
          "label": "中文",
          "onClick": (e, props) => {
            changeLocaleEvent('zh-CN');
          }
        },
        {
          "type": "button",
          "label": "English",
          "onClick": (e, props) => {
            changeLocaleEvent('en-US');
          }
        }
      ]
    },
    {
      "type": "dropdown-button",
      "label": "下拉菜单",
      "className": "ml-2",
      "icon": "fa fa-user",
      "align": "right",
      "buttons": [
        {
          "type": "button",
          "label": "退出登录",
          "onClick": "alert('点击了按钮'); console.log(props);"
        }
      ]
    }
  ]

  return <div className="flex items-center">
    <AmisComponent schema={headerRightSchema} />
  </div>;
}

export default HeaderRight;
