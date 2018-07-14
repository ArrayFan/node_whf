//引入第三方框架
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session")
//创建app
const app = express()

//对第静态资源进行处理
app.use(express.static(path.join(__dirname, "statics")))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//缓存中间件
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60000 }
  })
)
//引入路由
const accountRouter = require(path.join(
  __dirname,
  "./routers/accountRouter.js"
))
const studentRouter = require(path.join(
  __dirname,
  "./routers/studentRouter.js"
))
//使用路由中间件
app.use("/account", accountRouter)
app.use("/student", studentRouter)
//开启web服务
app.listen(3000, "127.0.0.1", err => {
  if (err) {
    console.log(err)
  }
  console.log("success")
})
