const mysql = require('mysql2/promise')


module.exports = mysql.createPool({
    host: "yudb.cnipvvcf6my9.us-east-2.rds.amazonaws.com",
    user: "soyeon",
    password: "20050910",
    database: "",
    port: 3306

    /*
    host: "test-db-instance.c0fft4ytotjz.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "admin1234",
    database: "test",
    port: 3306
    */
})