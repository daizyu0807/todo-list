const mongoose = require('mongoose')
// 設定 mongoose 連線
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo_list'
mongoose.connect(MONGODB_URI)

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db