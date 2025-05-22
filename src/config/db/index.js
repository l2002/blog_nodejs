const mongoose = require('mongoose');

let isConnected;

async function connect() {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(
      'mongodb+srv://luannguyen0515:0967168921l@cluster0.w17hecx.mongodb.net/luva_education_dev',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    isConnected = db.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
  }
}

module.exports = { connect };
