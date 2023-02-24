/* eslint-disable no-template-curly-in-string */
import { useRequest } from 'ahooks';
import { useState } from 'react';
import AmisComponent from "../components/AmisComponent";
import { loginFn } from "../api/user";
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../store/userInfo';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import { addPrefixName, encryptFn, decryptFn } from '../utils/index';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tabsList = [
    {
      label: '密码登录',
      value: 0
    },
    {
      label: '验证码登录',
      value: 1
    }
  ]
  const [tabsValue, setTabsValue] = useState(0);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const { loading, run: loginEvent } = useRequest(loginFn, {
    manual: true,
    onSuccess: (result, params) => {
      if(result.data.status === 0) {
        Cookies.set(addPrefixName('accessToken'), result.data.data.name, { expires: 7 })
        dispatch(setUserInfo(result.data.data));
        navigate('/');
      }
    }
  });

  const formWidth = '500px';

  const loginSchema = {
    "type": "spinner",
    "show": loading,
    "overlay": true,
    "body": {
      "type": "form",
      "style": {
        "width": formWidth
      },
      "title": "",
      // "api": {
      //   "url": "/api/login",
      //   "method": "post",
      //   "data": {
      //     "account": "${account}",
      //     "password": "${password}",
      //   },
      // },
      "mode": "horizontal",
      "trimValues": true,
      // "promptPageLeave": true,
      "body": [
        {
          "type": "input-text",
          "name": "account",
          "label": "账号",
          "required": true
        },
        {
          "type": "input-password",
          "name": "password",
          "label": "密码",
          "required": true
        },
        {
          "type": "checkbox",
          "name": "rememberMe",
          "label": "记住登录"
        }
      ],
      "actions": [
        {
          "type": "submit",
          "label": "登录",
        },
      ],
      "onSubmit": (e) => {
        setAccount(e.account);
        setPassword(e.password);
        loginEvent({account: e.account, password: e.password});
      }
    }
  }

  return <div className="w-screen h-screen flex items-center justify-center">
    <div style={{width: formWidth}}>
      <div className="flex items-center justify-center mb-4">
        {tabsList.map((x, i) => <div key={x.value} className={classNames('leading-8 cursor-pointer hover:text-blue-700', { 'ml-4': i > 0, 'text-primary': tabsValue === x.value })} onClick={() => setTabsValue(x.value)}>{x.label}</div>)}
      </div>
      <AmisComponent schema={loginSchema} />
    </div>
  </div>;
}

export default LoginPage;
