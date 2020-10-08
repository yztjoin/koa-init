const koa = require('koa');
const koaBody = require('koa-body');
const path = require('path');
const static = require('koa-static');
const config = require('./config');
const router = require('./router/index');
const verToken = require('./public/javascript/jwt');
const koa_jwt = require('koa-jwt');
const mongoose = require('./conn/index');
const app = new koa();
mongoose.userModel.find().then((doc) => {
  console.log(doc);
});
app.use(koaBody());
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Methods',
    'POST, GET, PATCH, DELETE, PUT, OPTIONS'
  );
  await next();
});
app.use(async (ctx, next) => {
  // 获取token值并拼接字符  Object.assign({},obj1,obj2) 可以拼接两个对象
  let params = Object.assign({}, ctx.request.query, ctx.request.body);
  ctx.request.header = { authorization: 'Bearer ' + (params.token || '') };
  if (params.token == undefined) {
    await next();
  } else {
    await verToken.verToken(params.token).then((data) => {
      ctx.state = {
        data: data,
      };
    });
    await next();
  }
});
app.use(async (ctx, next) => {
  return next().catch((err) => {
    // 判断状态码可以得知是否登录成功
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        msg: '登录过期，请重新登录',
      };
    } else {
      throw err;
    }
  });
});

app.use(
  koa_jwt({
    secret: config.secret,
  }).unless({
    path: ['/api', '/api/user', '/login'], //除了这个地址，其他的URL都需要验证
  })
);
app.use(static(path.join(__dirname, '/static')));
app.use(router.routes()).use(router.allowedMethods());
app.listen(config.post, config.postIp, () => {
  console.log(`服务器运行在${config.postIp}:${config.post}`);
});
