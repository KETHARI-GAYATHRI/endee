require('dotenv').config();
const app = require('./app');
const { connectDB, sequelize } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Sync Models (force: false preserves data, alter: true updates schema)
  try {
    // In production, use migrations instead of alter:true
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized.');
  } catch (error) {
    console.error('❌ Database sync failed:', error);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
};

startServer();
