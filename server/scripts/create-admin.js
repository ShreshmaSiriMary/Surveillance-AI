import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, MONGODB_URI } = process.env;
if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || !MONGODB_URI || ADMIN_PASSWORD.length < 12) {
  console.error('Set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD (12+ chars), and MONGODB_URI in server/.env.');
  process.exit(1);
}
const schema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, passwordHash: String, role: String }, { timestamps: true });
const User = mongoose.models.User || mongoose.model('User', schema);
try {
  await mongoose.connect(MONGODB_URI);
  const email = ADMIN_EMAIL.trim().toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) throw new Error('An account already uses this email; no changes made.');
  await User.create({ name: ADMIN_NAME.trim(), email, passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12), role: 'admin' });
  console.log(`Administrator account created for ${email}.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally { await mongoose.disconnect(); }
