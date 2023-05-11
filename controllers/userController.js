const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const User = require('../models/userModel');

exports.register = async (request, response) => {
  const ifEmailAlreadyPresent = await User.findOne({
    email: request.body.email,
  });

  if (ifEmailAlreadyPresent) {
    response.status(201).json({
      errorMessage: 'Email aleady exists, Please try another one.',
    });
  } else {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(request.body.password, salt);

    const user = new User({
      email: request.body.email,
      password: hash,
    });

    user
      .save()
      .then((result) => {
        response
          .status(201)
          .send({ message: 'User Created Successfully', result });
      })
      .catch((error) => {
        response.status(500).send({ message: 'Error creating user', error });
      });
  }
};

exports.login = async (request, response) => {
  const findUser = await User.findOne({
    email: request.body.email,
  });

  if (findUser) {
    const checkPassword = await bcrypt.compare(
      request.body.password,
      findUser.password
    );

    if (checkPassword) {
      const token = jwt.sign(
        {
          userId: findUser._id,
          userEmail: findUser.email,
        },
        config.jwtSecret,
        {
          expiresIn: config.jwtExpire,
        }
      );

      response.status(200).send({
        successMessage: 'Logged in Successfully',
        email: findUser.email,
        accessToken: token,
      });
    } else {
      response
        .status(201)
        .json({ errorMessage: 'Incorrect email or password.' });
    }
  } else {
    response.status(201).json({ errorMessage: 'Incorrect email or password.' });
  }
};
