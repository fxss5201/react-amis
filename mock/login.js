const Mock = require('mockjs');

module.exports = {
  "post /api/login": ctx => {
    const tabsValue = ctx.request.body.tabsValue
    const account = ctx.request.body.account
    const phone = ctx.request.body.phone
    let access = ['normal'];
    if (account === 'normal') {
      access = ['normal'];
    } else if (account === 'middle') {
      access = ['middle'];
    } else if (account === 'admin') {
      access = ['normal', 'middle', 'admin'];
    }
    const mocks = Mock.mock({
      header: () => Mock.Random.image(),
    })
    ctx.body = {
      "status": 0,
      "msg": "",
      "data": {
        ...mocks,
        name: tabsValue === 0 ? account : phone,
        access
      }
    }
  },
  "post /api/sendVerification": ctx => {
    ctx.body = {
      "status": 0,
      "msg": "",
      "data": {}
    }
  }
}