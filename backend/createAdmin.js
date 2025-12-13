const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('❌ Admin already exists!');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create new admin
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123',
      shopName: 'College Xerox Shop',
      phoneNumber: '+919876543210',
      upiId: 'xeroxshop@upi'
    });

    console.log('✅ Admin created successfully!');
    console.log('Username:', admin.username);
    console.log('Password: admin123');
    console.log('Shop Name:', admin.shopName);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();