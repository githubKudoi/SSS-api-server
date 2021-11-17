const express = require('express')
const indexRouter = require('./routes/index')

const _PORT = 12301

const app = express()

app.use('/', indexRouter)

app.listen(_PORT, () => {
    console.log("Server started")
})