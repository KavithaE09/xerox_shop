const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const router = express.Router();

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, department } = req.body;

    console.log('📝 Registration attempt:', { name, email, role, phoneNumber, department });

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      phoneNumber,
      department
    });

    console.log('✅ User created successfully:', user._id);

    const token = generateToken(user._id, 'user');

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        department: user.department
      }
    });
  } catch (error) {
    console.error('🔥 Registration Error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', email);

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Login successful:', email);

    const token = generateToken(user._id, 'user');

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        department: user.department
      }
    });
  } catch (error) {
    console.error('🔥 Login Error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/admin/login
// @desc    Login admin
// @access  Public
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('🔐 Admin login attempt:', username);

    // Check for admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('❌ Admin not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log('❌ Invalid password for admin:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Admin login successful:', username);

    const token = generateToken(admin._id, 'admin');

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        shopName: admin.shopName,
        phoneNumber: admin.phoneNumber,
        upiId: admin.upiId
      }
    });
  } catch (error) {
    console.error('🔥 Admin Login Error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;