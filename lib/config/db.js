const mysql = require('mysql2/promise')

module.exports = mysql.createPool({
    host: "test-db-instance.c0fft4ytotjz.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "admin1234",
    database: "test",
    port: 3306
})