const Mock = require('mockjs');

module.exports = {
  "post /api/login": ctx => {
    const account = ctx.request.body.account
    let access = [];
    if (account === 'normal') {
      access = ['normal'];
    } else if (account === 'middle') {
      access = ['middle'];
    } else if (account === 'admin') {
      access = ['normal', 'middle', 'admin'];
    }
    const mocks = Mock.mock({
      name: () => Mock.Random.cname(),
      header: () => Mock.Random.image(),
    })
    ctx.body = {
      "status": 0,
      "msg": "",
      "data": {
        ...mocks,
        access
      }
    }
  }
}