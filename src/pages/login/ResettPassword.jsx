/* eslint-disable no-template-curly-in-string */
import { useRequest, useCountDown } from 'ahooks';
import { useState } from 'react';
import AmisComponent from "../../components/AmisComponent";
import { resetPasswordFn, sendVerificationFn } from "../../api/user";
import { useNavigate } from 'react-router-dom';
const pkg = require('../../../package.json');

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSendVerification, setIsSendVerification] = useState(false);
  const [targetDate, setTargetDate] = useState();
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      setIsSendVerification(false);
    },
  });
  const { loading, run: resetPasswordEvent } = useRequest(resetPasswordFn, {
    manual: true,
    onSuccess: (result, params) => {
      if(result.data.status === 0) {
        navigate('/login');
      }
    }
  });

  const {loading: verificationLoading, run: sendVerificationEvent} = useRequest(sendVerificationFn, {
    manual: true,
    onSuccess: (result, params) => {
      if(result.data.status === 0) {
        // toast.success('验证码发送成功', {});
        setTargetDate(Date.now() + 60 * 1000);
        setIsSendVerification(true);
      }
    }
  })

  const formWidth = '400px';
  // 顶部按钮组
  const formActions = [
    {
      "type": "submit",
      "label": "重置密码",
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
      "label": "前往注册",
      "actionType": "link",
      "link": "/register"
    },
  ]

  // 密码登录
  const registerSchema = {
    "type": "spinner",
    "show": loading || verificationLoading,
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
          "placeholder": "请输入验证码",
          "addOn": {
            "type": "button",
            "label": isSendVerification ? `${Math.round(countdown / 1000)}s` : "发送验证码",
            "onClick": (e, props) => {
              // 暂时未找到只验证 phone 的方式
              if (isSendVerification) return false
              props.formStore.validate();
              if (/^1\d{10}$/.test(props.formStore.data.phone)) {
                sendVerificationEvent({phone: props.formStore.data.phone});
              }
            },
            "disabled": isSendVerification
          }
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
        resetPasswordEvent({
          account: e.account,
          email: e.email,
          phone: e.phone,
          verification: e.verification,
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
