const express = require("express")
const path = require("path")

const studentRouter = express.Router()

//导入控制器
const studentCTRL = require(path.join(
  __dirname,
  "../controllers/studentContronller.js"
))

//处理请求
//获取学生列表页面
studentRouter.get("/list", studentCTRL.getStudentListPage)

module.exports = studentRouter
