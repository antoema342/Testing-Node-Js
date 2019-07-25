const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var mysql = require('mysql');


//user model
// const User = require('../models/User');

//login page 
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sampledb"
});
//LOGIN PAGE
router.get('/login', (req, res) => res.render('login'));

//PROSES LOGIN
router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let sql = "SELECT * FROM user WHERE email = '" + email + "' AND password = '" + password + "'";
  console.log(sql)
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length > 0) {
      console.log("ada data")
      // KALAU LOGIN BERHASIL SILAHKAN REDIRECT KE HALAMAN SELANJUTNYA DISINI
    }
    else {
      //KALAU GAGAL LOGIN DISINI
    }
    console.log(result);
  })
})

//register page 
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check 
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill all fields' });
  }

  //check valid password 1 and 2 
  if (password !== password2) {
    errors.push({ msg: 'password nya engga cocok ea babang !' });
  }
  if (password.length > 11) {
    errors.push({ msg: 'Password harus 11 :) ' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  }
  let sql = "INSERT INTO user (username,email,password,password2) VALUES ('"+name+"','"+email+"','"+password+"','"+password2+"')";
  console.log(sql)
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result != null) {
      console.log("ada data")
      // KALAU REGISTRASI BERHASIL SILAHKAN REDIRECT KE HALAMAN SELANJUTNYA DISINI
    }
    else {
      //KALAU GAGAL REGISTRASI DISINI
    }
    console.log(result);
  })

});

module.exports = router;