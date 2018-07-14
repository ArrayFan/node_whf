const path = require("path")
//引入图片验证码包
const captchapng = require("captchapng")
//引入mongodb
const MongoClient = require("mongodb").MongoClient

const url = "mongodb://localhost:27017"

const dbName = "account"

//获取登录页面的方法
exports.getLoginPage = (req, res) => {
  // console.log("11111111")
  res.sendFile(path.join(__dirname, "../views/login.html"))
}

exports.getVcodeImage = (req, res) => {
  const vcode = parseInt(Math.random() * 9000 + 1000)
  //2.存起来?，存储到session中去了
  req.session.vcode = vcode
  //利用我们刚刚开辟的内存空间，存储我们的验证码数字
  // req.session.vcode = vcode
  var p = new captchapng(80, 30, vcode) // width,height,numeric captcha
  p.color(0, 0, 0, 0) // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255) // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64()
  var imgbase64 = new Buffer(img, "base64")
  //res.setHeader()
  res.writeHead(200, {
    "Content-Type": "image/png"
  })
  res.end(imgbase64)
}
//暴露一个请求register
exports.getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"))
}
//处理注册信息
exports.register = (req, res) => {
  //成功信息(假设前提是成功的)
  const result = { status: 0, message: "注册成功" }
  //获取注册信息,post请求放在请求体里
  let { username } = req.body
  //链接数据库
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName)
      //获取集合
      const collection = db.collection("userInfo")
      // Find some documents
      collection.findOne({ username }, (err, doc) => {
        if (doc != null) {
          result.status = 1
          result.message = "用户名已注册"
          client.close()
          res.json(result)
        } else {
          //添加用户
          collection.insertOne(req.body, function(err, result1) {
            if ((result1 = null)) {
              result.status = 2
              result.message = "注册失败"
            }
            client.close()
            res.json(result)
          })
        }
      })
    }
  )
}
//处理登录信息
exports.login = (req, res) => {
  const result = { status: 0, message: "登录成功" }
  let { username, password, vcode } = req.body
  //2.验证验证码
  if (vcode != req.session.vcode) {
    console.log(req.session.vcode)
    result.status = 1
    result.message = "验证码错误!"
    res.json(result)
    return
  }
  //验证用户名
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName)
      const collection = db.collection("userInfo")
      collection.findOne({ username, password }, (err, doc) => {
        if (doc == null) {
          result.status = 1
          result.message = "账号或密码错误"
          client.close()
          res.json(result)
        }
        client.close()
        res.json(result)
      })
    }
  )
}
