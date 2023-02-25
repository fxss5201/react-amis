/* eslint-disable no-template-curly-in-string */
import { useRequest } from 'ahooks';
import AmisComponent from "../../components/AmisComponent";
import { registerFn } from "../../api/user";
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../store/userInfo';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { addPrefixName } from '../../utils/index';
const pkg = require('../../../package.json');

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, run: registerEvent } = useRequest(registerFn, {
    manual: true,
    onSuccess: (result, params) => {
      if(result.data.status === 0) {
        Cookies.set(addPrefixName('accessToken'), result.data.data.name, { expires: 7 });
        dispatch(setUserInfo(result.data.data));
        navigate('/');
      }
    }
  });

  const formWidth = '400px';
  // 顶部按钮组
  const formActions = [
    {
      "type": "submit",
      "label": "注册",
      "level": "primary"
    },
    {
      "type": "action",
      "label": "前往登录",
      "actionType": "link",
      "link": "/login"
    },
    {
      "type": "action",
      "label": "前往重置密码",
      "actionType": "link",
      "link": "/resetpassword"
    },
  ]

  // 密码登录
  const registerSchema = {
    "type": "spinner",
    "show": loading,
    "overlay": true,
    "body": {
      "type": "form",
      "style": {
        "width": formWidth
      },
      "title": "",
      "mode": "horizontal",
      "horizontal": {
        "leftFixed": "sm"
      },
      "trimValues": true,
      // "promptPageLeave": true,
      "body": [
        {
          "type": "input-text",
          "name": "account",
          "label": "账号名",
          "clearable": true,
          "required": true,
          "validateOnChange": true,
          "validationErrors": {
            "isRequired": "请输入账号名"
          },
          "placeholder": "请输入账号名"
        },
        {
          "type": "input-email",
          "name": "email",
          "label": "邮箱",
          "clearable": true,
          "required": true,
          "validateOnChange": true,
          "validationErrors": {
            "isRequired": "请输入邮箱",
            "isEmail": "邮箱格式不正确"
          },
          "placeholder": "请输入邮箱"
        },
        {
          "type": "input-text",
          "name": "phone",
          "label": "手机号",
          "required": true,
          "clearable": true,
          "validations": {
            "isPhoneNumber": true
          },
          "validateOnChange": true,
          "validationErrors": {
            "isRequired": "请输入手机号"
          },
          "placeholder": "请输入手机号"
        },
        {
          "type": "input-password",
          "name": "password",
          "label": "密码",
          "clearable": true,
          "required": true,
          "validateOnChange": true,
          "validationErrors": {
            "isRequired": "请输入密码"
          },
          "placeholder": "请输入密码"
        }
      ],
      "actions": formActions,
      "onSubmit": (e) => {
        registerEvent({
          account: e.account,
          email: e.email,
          phone: e.phone,
          password: e.password
        });
      }
    }
  }

  return <div className="w-screen h-screen flex items-center justify-center">
    <div style={{width: formWidth}}>
      <div className="text-3xl text-center mb-3">{pkg.name}</div>
      <AmisComponent schema={registerSchema} />
    </div>
  </div>;
}

export default LoginPage;
