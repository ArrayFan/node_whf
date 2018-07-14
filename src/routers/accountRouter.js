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
//获取登录页面
accountRouter.get("/login", accountCTRL.getLoginPage)
//获取验证码
accountRouter.get("/vcode", accountCTRL.getVcodeImage)
//获取注册页面
accountRouter.get("/register", accountCTRL.getRegisterPage)
//处理注册信息
accountRouter.post("/register", accountCTRL.register)
//处理登录信息
accountRouter.post("/login", accountCTRL.login)
//导出路由模块
module.exports = accountRouter
