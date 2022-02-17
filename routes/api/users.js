var router = require('express').Router();
var bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');

let { User } = require('../../models/user');

router.post('/register', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user)
      return res.status(400).send('User with given Email already exist');

    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.generateHashedPassword();

    await user.save();

    res.redirect('/');

    return res.send(_.pick(user, ['name', 'email']));
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send('User Not Registered');

    let isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) return res.status(401).send('Invalid Password');

    let token = jwt.sign(
      { _id: user._id, name: user.name },
      config.get('jwtPrivateKey')
    );

    req.session.user = user;
    // res.send(token);
    res.cookie('auth', token);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.cookie('auth', null);
  res.redirect('/');
});

module.exports = router;
