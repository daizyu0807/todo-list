const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')

const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// 設定 mongoose 連線
mongoose.connect('mongodb://localhost/todo_list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// 首頁路由
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error('error'))
})

// 新增 todo 頁面
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// 新增 todo 到資料庫
app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 查詢 todo 詳情
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// 顯示 todo 編輯頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// 編輯 todo 到資料
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone} = req.body // 解構賦值 (destructuring assignment)
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on' // req.body.isDone is true or false
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// 刪除 todo 到資料庫
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`APP is running on port:${port}`)
})