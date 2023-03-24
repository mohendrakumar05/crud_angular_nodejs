var db = require("../dbconnection");

//models
var common = {
  saveUserData: function (data, callback) {
    // console.log(data);
    let { first_name, last_name, gender, date_of_birth, email, contact } = data;

    try {
      db.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          `insert into user(first_name, last_name, gender, date_of_birth, email, contact) values(?, ?, ?, ?, ?, ?)`,
          [first_name, last_name, gender, date_of_birth, email, contact],
          function (err, result) {
            try {
              connection.release();
              if (err) throw err;
              return callback(null, result);
            } catch (query_err) {
              return callback(query_err);
            }
          }
        );
      });
    } catch (connection_err) {
      return callback(connection_err);
    }
  },

  updateUserData: function (data, callback) {
    let { u_id, first_name, last_name, gender, date_of_birth, email, contact } =
      data;

    try {
      db.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          "update user set first_name = ?,last_name = ?,gender = ?,date_of_birth = ?,email = ?,contact  = ? where u_id = ? ",
          [first_name, last_name, gender, date_of_birth, email, contact, u_id],
          (query_err, result) => {
            try {
              connection.release();
              if (query_err) throw query_err;
              return callback(null, result);
            } catch (err1) {
              return callback(err1);
            }
          }
        );
      });
    } catch (error) {
      return callback(error);
    }
  },

  userList: function (param, callback) {
    try {
      db.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          "SELECT * FROM user ORDER BY u_id",
          (query_err, result) => {
            try {
              connection.release();
              if (query_err) throw query_err;
              // console.log(result);
              return callback(null, result);
            } catch (err2) {
              return callback(err2);
            }
          }
        );
      });
    } catch (err1) {
      return callback(err1);
    }
  },

  deleteSingleUserData: function (param, callback) {
    // console.log(param);
    let u_id = param.p1;
    try {
      db.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          "delete from user where u_id = ?",
          [u_id],
          (query_err, result) => {
            try {
              connection.release();
              if (query_err) throw query_err;
              return callback(null, result);
            } catch (err2) {
              return callback(err2);
            }
          }
        );
      });
    } catch (err1) {
      return callback(err1);
    }
  },
};

module.exports.common = common;
