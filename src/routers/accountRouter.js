const express = require("express")
// const app = express()
const path = require("path")
//创建路由对象
const accountRouter = express.Router()
//引入控制组件,打通路由和控制件
const accountCTRL = require(path.join(
  __dirname,
  "../controllers/accountController"
))
//处理请求
accountRouter.get("/login", accountCTRL.getLoginPage)

//获取验证码
accountRouter.get("/vcode", accountCTRL.getVcodeImage)
//导出路由模块
module.exports = accountRouter
