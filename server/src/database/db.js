const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config();
const { db_config } = require("../config/db.config");

function Database() {
  const connection = mysql.createPool(db_config);
  return connection;
}
const db = Database();
module.exports = db;
