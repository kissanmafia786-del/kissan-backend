// Optional seed helper (run with node utils/seed.js after installing deps)
const mongoose = require('mongoose');
const models = require('../models');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('connected');
  await models.Task.deleteMany({});
  await models.Task.create([
    { title: 'Complete survey', description: 'Quick 2-min survey', countryCodes: ['PK','IN'], points: 0.5 },
    { title: 'Install app', description: 'Install partner app and open', countryCodes: ['US','GB'], points: 1.0 }
  ]);
  console.log('seeded');
  process.exit();
}
seed();