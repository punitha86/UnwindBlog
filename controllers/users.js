const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

router.get('/new', (req, res) => {
    res.render('users/login.ejs');
})

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.post('/', (req, res) => {
  //console.log('reqbody',req.body);
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
      req.session.username=createdUser.username;
      console.log(error);
      //console.log(req.body);
        res.redirect('/blogs');
    })
});

module.exports = router;