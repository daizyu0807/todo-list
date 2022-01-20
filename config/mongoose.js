const mongoose = require('mongoose')
// 設定 mongoose 連線
mongoose.connect('mongodb://localhost/todo_list')

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db