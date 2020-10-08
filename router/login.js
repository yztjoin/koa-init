const myjwt = require('../public/javascript/jwt');
exports.login = async (ctx) => {
  let user = ctx.request.body;
  let token;
  if (user.user == '123123' && user.psw == '123123') {
    await myjwt.signToken({ user: user.user }, '1h').then((data) => {
      token = data;
    });
    ctx.body = {
      success: true,
      code: 1,
      token,
    };
  } else {
    ctx.body = {
      success: false,
      code: -1,
    };
  }
};
