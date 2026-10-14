import { before, after, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import bcrypt from 'bcryptjs';

process.env.JWT_SECRET = 'test-secret-that-is-longer-than-thirty-two-characters';
process.env.FRONTEND_URL = 'http://localhost:5173';
const { default: app } = await import('../src/server.js');
let mongo; let agent; let csrf;
async function csrfHeader(client = agent) {
  const response = await client.get('/api/auth/csrf');
  return response.body.csrfToken;
}
before(async () => { mongo = await MongoMemoryServer.create(); await mongoose.connect(mongo.getUri()); });
after(async () => { await mongoose.disconnect(); await mongo.stop(); });
beforeEach(async () => { await mongoose.connection.dropDatabase(); agent = request.agent(app); csrf = await csrfHeader(); });

test('citizen registration hashes password and assigns citizen role; login establishes session', async () => {
  const registration = await agent.post('/api/auth/register').set('x-csrf-token', csrf).send({ name: 'Example Person', email: 'person@example.com', password: 'a-long-password-123' }).expect(201);
  assert.equal(registration.body.user.role, 'citizen');
  assert.equal('passwordHash' in registration.body.user, false);
  assert.equal((await agent.get('/api/auth/me')).body.user.email, 'person@example.com');
  await agent.post('/api/auth/logout').set('x-csrf-token', csrf).send({}).expect(200);
  await agent.post('/api/auth/login').set('x-csrf-token', csrf).send({ email: 'person@example.com', password: 'a-long-password-123', selectedRole: 'admin' }).expect(403);
  await agent.post('/api/auth/login').set('x-csrf-token', csrf).send({ email: 'person@example.com', password: 'wrong-password' }).expect(401);
});

test('missing submissions are private until admin moderation and public output omits contact details', async () => {
  await agent.post('/api/auth/register').set('x-csrf-token', csrf).send({ name: 'Reporter Name', email: 'reporter@example.com', password: 'a-long-password-123', phone: '555-0100' }).expect(201);
  const created = await agent.post('/api/missing-persons').set('x-csrf-token', csrf).send({ fullName: 'Missing Person', lastSeenLocation: 'Central Park', lastSeenAt: new Date().toISOString(), reporterContact: 'private-number' }).expect(201);
  assert.equal(created.body.item.reviewStatus, undefined);
  assert.equal((await agent.get('/api/missing-persons')).body.total, 0);
  const reportId = created.body.item.id;
  await mongoose.model('User').create({ name: 'Test Admin', email: 'admin@example.com', passwordHash: await bcrypt.hash('admin-test-password-123', 4), role: 'admin' });
  const admin = request.agent(app); const adminCsrf = await csrfHeader(admin);
  await admin.post('/api/auth/login').set('x-csrf-token', adminCsrf).send({ email: 'admin@example.com', password: 'admin-test-password-123' }).expect(200);
  await admin.patch(`/api/admin/missing-persons/${reportId}/review`).set('x-csrf-token', adminCsrf).send({ reviewStatus: 'approved' }).expect(200);
  const publicResponse = await request(app).get('/api/missing-persons').expect(200);
  assert.equal(publicResponse.body.total, 1);
  assert.equal('reporterContact' in publicResponse.body.items[0], false);
});

test('validation rejects malformed report fields and role elevation on register is ignored', async () => {
  const result = await agent.post('/api/auth/register').set('x-csrf-token', csrf).send({ name: 'Person', email: 'not-an-email', password: 'short', role: 'admin' }).expect(400);
  assert.equal(result.body.error, 'Please check the submitted fields.');
  await agent.post('/api/auth/register').set('x-csrf-token', csrf).send({ name: 'Regular Person', email: 'regular@example.com', password: 'a-long-password-123', role: 'admin' }).expect(201);
  assert.equal((await agent.get('/api/auth/me')).body.user.role, 'citizen');
  await agent.post('/api/reports').set('x-csrf-token', csrf).send({ missingPerson: 'bad-id', description: 'x', sightingLocation: '', sightingDate: 'bad-date' }).expect(400);
});
