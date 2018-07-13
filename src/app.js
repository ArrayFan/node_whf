//引入第三方框架
const express = require("express")
const path = require("path")
//创建app
const app = express()
//对第静态资源进行处理
app.use(express.static(path.join(__dirname, "statics")))
//引入路由
const accountRouter = require(path.join(__dirname, "/routers/accountRouter"))
//使用路由中间件
app.use("/account", accountRouter)
//开启web服务
app.listen(3000, "127.0.0.1", err => {
  if (err) {
    console.log(err)
  }
  console.log("success")
})
