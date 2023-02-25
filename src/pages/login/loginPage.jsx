/* eslint-disable no-template-curly-in-string */
import { useLocalStorageState, useMount, useRequest } from 'ahooks';
import { useState } from 'react';
import AmisComponent from "../../components/AmisComponent";
import { loginFn, sendVerificationFn } from "../../api/user";
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../store/userInfo';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import { addPrefixName, encryptFn, decryptFn } from '../../utils/index';
const pkg = require('../../../package.json');

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
  const [remember, setRemember] = useState(false);
  const [isSendVerification, setIsSendVerification] = useState(false);
  const [localLoginInfo, setLocalLoginInfo] = useLocalStorageState(addPrefixName('loginInfo'));
  useMount(() => {
    if (localLoginInfo) {
      setAccount(localLoginInfo.account);
      setPassword(decryptFn(localLoginInfo.password));
      setRemember(localLoginInfo.remember);
    }
  })

  const { loading, run: loginEvent } = useRequest(loginFn, {
    manual: true,
    onSuccess: (result, params) => {
      if(result.data.status === 0) {
        Cookies.set(addPrefixName('accessToken'), result.data.data.name, { expires: 7 });
        dispatch(setUserInfo(result.data.data));
        navigate('/');
      }
    }
  });

  const {loading: verificationLoading, run: sendVerificationEvent} = useRequest(sendVerificationFn, {
    manual: true,
    onSuccess: (result, params) => {
      if(result.data.status === 0) {
        // toast.success('验证码发送成功', {});
        alert('验证码发送成功');
      }
    }
  })

  const formWidth = '400px';
  // 顶部按钮组
  const formActions = [
    {
      "type": "submit",
      "label": "登录",
      "level": "primary"
    },
    {
      "type": "action",
      "label": "注册",
      "actionType": "link",
      "link": "../docs/index"
    },
    {
      "type": "action",
      "label": "忘记密码",
      "actionType": "link",
      "link": "../docs/index"
    },
  ]

  // 密码登录
  const loginPasswordSchema = {
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
          "label": "账号",
          "value": account,
          "clearable": true,
          "required": true,
          "validateOnChange": true,
          "validationErrors": {
            "isRequired": "请输入账号"
          }
        },
        {
          "type": "input-password",
          "name": "password",
          "label": "密码",
          "value": password,
          "clearable": true,
          "required": true,
          "validateOnChange": true,
          "validationErrors": {
            "isRequired": "请输入密码"
          }
        },
        {
          "type": "checkbox",
          "name": "remember",
          "value": remember,
          "label": "记住登录"
        }
      ],
      "actions": formActions,
      "onSubmit": (e) => {
        loginEvent({tabsValue, account: e.account, password: e.password});
        if (e.remember) {
          setLocalLoginInfo({
            account: e.account,
            password: encryptFn(e.password),
            remember: e.remember
          })
        } else {
          setLocalLoginInfo({
            account: '',
            password: encryptFn(''),
            remember: false
          })
        }
      }
    }
  }

  // 验证码登录
  const loginVerificationSchema = {
    "type": "spinner",
    "show": loading || verificationLoading,
    "overlay": true,
    "body": {
      "type": "form",
      "name": "verificationForm",
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
          }
        },
        {
          "type": "input-text",
          "name": "verification",
          "label": "验证码",
          "required": true,
          "clearable": true,
          "validations": {
            "isLength": 6
          },
          "validateOnChange": true,
          "validationErrors": {
            "isRequired": "请输入验证码"
          },
          "addOn": {
            "type": "button",
            "label": "发送验证码",
            "onClick": (e, props) => {
              // 暂时未找到只验证 phone 的方式
              props.formStore.validate();
              if (/^1\d{10}$/.test(props.formStore.data.phone)) {
                sendVerificationEvent({phone: props.formStore.data.phone});
              }
            }
          }
        }
      ],
      "actions": formActions,
      "onSubmit": (e) => {
        loginEvent({tabsValue, phone: e.phone, verification: e.verification});
      }
    }
  }

  return <div className="w-screen h-screen flex items-center justify-center">
    <div style={{width: formWidth}}>
      <div className="text-3xl text-center mb-3">{pkg.name}</div>
      <div className="flex items-center justify-center mb-4">
        {tabsList.map((x, i) => <div key={x.value} className={classNames('leading-8 cursor-pointer hover:text-blue-700', { 'ml-4': i > 0, 'text-primary': tabsValue === x.value })} onClick={() => setTabsValue(x.value)}>{x.label}</div>)}
      </div>
      {tabsValue === 0 && <AmisComponent schema={loginPasswordSchema} />}
      {tabsValue === 1 && <AmisComponent schema={loginVerificationSchema} />}
    </div>
  </div>;
}

export default LoginPage;
