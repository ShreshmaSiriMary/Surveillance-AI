import 'dotenv/config';
import mongoose from 'mongoose';
import app from './server.js';

const port = Number(process.env.PORT || 4000);
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('MONGODB_URI and a JWT_SECRET of at least 32 characters are required.');
  process.exit(1);
}
try {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => console.log(`Survelliance-AI API listening on ${port}`));
} catch (error) {
  console.error('Database connection failed:', error.message);
  process.exit(1);
}
