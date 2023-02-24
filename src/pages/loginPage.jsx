/* eslint-disable no-template-curly-in-string */
import { useRequest } from 'ahooks';
import { useState } from 'react';
import AmisComponent from "../components/AmisComponent";
import { loginFn } from "../api/user";

const LoginPage = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const { loading, run: loginEvent } = useRequest(loginFn, {
    manual: true,
    onSuccess: (result, params) => {
      console.log(result)
    }
  });

  const loginSchema = {
    "type": "spinner",
    "show": loading,
    "overlay": true,
    "body": {
      "type": "form",
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
      "style": {
        "width": "500px"
      },
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

  return <div className="w-screen h-screen">
    <AmisComponent schema={loginSchema} />
  </div>;
}

export default LoginPage;
