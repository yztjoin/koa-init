const Router = require('koa-router');
const router = new Router();
const koabody = require('koa-body')({
  multipart: true, // 支持文件上传
});
const login = require('./login').login;
router.get('/api', async (ctx) => {
  ctx.body = {
    success: true,
    msg: '这是api接口',
  };
});
router.get('/api/user', async (ctx) => {
  ctx.body = {
    success: true,
    msg: '这是api的用户接口',
  };
});
router.get('/', async (ctx) => {
  console.log(ctx.request.query);
  ctx.body = ctx.request.query;
});
router.post('/login', async (ctx) => {
  login(ctx);
});
router.post('/userInfo', async (ctx) => {
  console.log(ctx.state.user);
  ctx.body = { username: ctx.state.user };
});
module.exports = router;
