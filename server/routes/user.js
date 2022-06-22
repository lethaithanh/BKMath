const express = require('express');
const router = express.Router();
const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

/**********************************************************************
 * @route: POST /api/users/register
 * @desc:  Register user
 * @access: Public
 */
router.post('/register', async (req, res) => {
  const { lastname, firstname, email, password } = req.body;

  if (!lastname || !firstname || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing user information',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email is already taken',
      });
    }
    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      lastname,
      firstname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: 'User created successfully',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**********************************************************************
 * @route: POST /api/users/login
 * @desc:  Login user
 * @access: Public
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing email and/or password',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect email or password',
      });
    }
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect email or password',
      });
    }
    // Return token
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: 'User logged in successfully',
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**********************************************************************
 * @route: POST /api/users
 * @desc:  Create user
 * @access: Private
 */
router.post('/', async (req, res) => {
  const { lastname, firstname, email, password, avatar, info, status } =
    req.body;

  if (!lastname || !firstname || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing user information',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email is already taken',
      });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      lastname,
      firstname,
      email,
      password: hashedPassword,
      avatar: avatar || '',
      info: info || '',
      status: status || 'ACTIVE',
    });
    await newUser.save();
    // Return token
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: 'User created successfully',
      user: newUser,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**********************************************************************
 * @route: GET /api/users
 * @desc:  Get all users
 * @access: Private
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) return res.json({ success: true, users });
    else
      return res
        .status(400)
        .json({ success: false, message: 'No users in the database' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**********************************************************************
 * @route: PUT /api/users/:id
 * @desc:  Update user
 * @access: Private
 */
router.put('/:id', async (req, res) => {
  const { lastname, firstname, email, password, avatar, info, status } =
    req.body;

  if (!lastname || !firstname || !email) {
    return res.status(400).json({
      success: false,
      message: 'Missing user information',
    });
  }

  try {
    let updatedUser;
    if (password !== '') {
      const hashedPassword = await argon2.hash(password);
      updatedUser = {
        lastname,
        firstname,
        email,
        password: hashedPassword,
        avatar: avatar || '',
        info: info || '',
        status: status || 'ACTIVE',
      };
    } else {
      updatedUser = {
        lastname,
        firstname,
        email,
        avatar: avatar || '',
        info: info || '',
        status: status || 'ACTIVE',
      };
    }
    const userUpdateCondition = { _id: req.params.id };
    updatedUser = await User.findOneAndUpdate(
      userUpdateCondition,
      updatedUser,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(401).json({
        success: true,
        message: 'User not found',
      });
    }
    res.send({
      success: true,
      message: 'Excelent progress! User updated.',
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**********************************************************************
 * @route: DELETE /api/users/:id
 * @desc:  Delete user
 * @access: Private
 */
router.delete('/:id', async (req, res) => {
  try {
    const userDeleteCondition = { _id: req.params.id };
    const deletedUser = await User.findOneAndDelete(userDeleteCondition);
    if (!deletedUser) {
      return res.status(401).json({
        success: true,
        message: 'User not found',
      });
    }
    res.send({
      success: true,
      message: 'Excelent progress! User deleted.',
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**********************************************************************
 * Export
 */
module.exports = router;
