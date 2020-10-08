const mongoose = require('mongoose');
const mongo = mongoose.createConnection(
  'mongodb://notepaduser:notepadpsw@127.0.0.1:27017/notepad',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log('数据库链接失败');
    } else {
      console.log('数据库链接成功');
    }
  }
);
const userModel = mongo.model('user', {
  user: String,
  psw: String,
});
const ntInfoModel = mongo.model('notepadInfo', {
  noteDate: {
    year: Number,
    month: Number,
    day: Number,
  },
  item: [
    {
      time: {
        hour: Number,
        minute: Number,
        second: Number,
      },
      lable: String,
      finish: Boolean,
      content: {
        theme: String,
        item: Array,
      },
    },
  ],
});

module.exports = {
  userModel,
};
