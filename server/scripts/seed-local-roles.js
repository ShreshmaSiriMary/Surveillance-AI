import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

if (process.env.NODE_ENV !== 'development') {
  console.error('Local review accounts can only be created when NODE_ENV=development.');
  process.exit(1);
}
const { MONGODB_URI, LOCAL_REVIEW_PASSWORD } = process.env;
if (!MONGODB_URI || !LOCAL_REVIEW_PASSWORD || LOCAL_REVIEW_PASSWORD.length < 12) {
  console.error('Set MONGODB_URI and LOCAL_REVIEW_PASSWORD (12+ characters) in server/.env.');
  process.exit(1);
}

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: String,
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['citizen', 'officer', 'admin'], required: true },
}, { timestamps: true }));

const accounts = [
  { name: 'Local Review Administrator', email: 'admin.review@example.com', role: 'admin' },
  { name: 'Local Review Officer', email: 'officer.review@example.com', role: 'officer' },
  { name: 'Local Review Citizen', email: 'citizen.review@example.com', role: 'citizen' },
];

try {
  await mongoose.connect(MONGODB_URI);
  const passwordHash = await bcrypt.hash(LOCAL_REVIEW_PASSWORD, 12);
  for (const account of accounts) {
    const exists = await User.exists({ email: account.email });
    if (exists) console.log(`Skipped existing ${account.role} review account: ${account.email}`);
    else { await User.create({ ...account, passwordHash }); console.log(`Created ${account.role} review account: ${account.email}`); }
  }
  console.log('All local review accounts use LOCAL_REVIEW_PASSWORD from server/.env.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally { await mongoose.disconnect(); }
