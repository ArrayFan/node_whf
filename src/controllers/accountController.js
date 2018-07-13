const path = require("path")

const captchapng = require("captchapng")

exports.getLoginPage = (req, res) => {
  // console.log("11111111")
  res.sendFile(path.join(__dirname, "../views/login.html"))
}

exports.getVcodeImage = (req, res) => {
  const vcode = parseInt(Math.random() * 9000 + 1000)

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
