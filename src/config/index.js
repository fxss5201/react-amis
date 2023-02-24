const config = {
  locale: 'zh-CN', // 设置默认语言，可选值 zh-CN/en-US
  isShowToggleLang: true, // 是否显示切换语言，默认展示，如果设置为 false，则必须设置locale
  prefixName: '', // 配置添加前缀的名称，未配置则使用 package.json 的 name
  phonePattern: /^1\d{10}$/, // 手机号正则
  verificationPattern: /^\d{6}$/, // 验证码正则
  secretKey: '', // 密码保存本地时的加解密key，未配置则使用 package.json 的 name

  // 没权限时跳转的 path ，默认值为'/403'，'/403' 或者 '/404'
  noAccessPath: '/403',

  // 配置线上的接口请求基本地址
  axiosBaseURL: 'https://www.fastmock.site/mock/dfd0c4a6ed4e2d7107cd3a43bc66b154/react-amis'
}

export default config;
