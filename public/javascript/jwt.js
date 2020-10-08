const jwt = require('jsonwebtoken'); // 引入jsonwebtoken
const secret = require('../../config').secret; // 设置密钥
function verToken(token, secret) {
  // 封装验证token函数
  return new Promise((reslove, rejest) => {
    // 验证token方法 jwt.verify(token, 密钥, 回调函数) 返回的是注册token的信息
    let info = jwt.verify(token, secret);
    reslove(info);
  }).catch((err) => {
    console.log('verToken err :' + err);
  });
}
function signToken(obj, time) {
  return new Promise((reslove, reject) => {
    // 注册token方法 jwt.sign(储存的信息，密钥，options)
    // options:
    // algorithm：加密算法（默认值：HS256）
    // expiresIn：以秒表示或描述时间跨度zeit / ms的字符串。如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
    // notBefore：以秒表示或描述时间跨度zeit / ms的字符串。如：60，"2days"，"10h"，"7d"
    // audience：Audience，观众
    // issuer：Issuer，发行者
    // jwtid：JWT ID
    // subject：Subject，主题
    // noTimestamp
    // header
    const token = jwt.sign(obj, secret, { expiresIn: time });
    reslove(token);
  }).catch((err) => {
    console.log('signToken err :' + err);
  });
}
module.exports = {
  verToken,
  signToken,
};
