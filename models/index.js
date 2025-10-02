const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  phone: String,
  passwordHash: String,
  country: String,
  role: { type: String, default: 'user' },
  walletBalance: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
  paypalEmail: String,
  jazzCashNumber: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);
const User = require(".User");                              
const transactionSchema = new Schema({
 userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: String, // credit/debit
  source: String, // ad/task/withdraw/admin
  amount: Number,
  meta: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});
const Transaction = mongoose.model('Transaction', transactionSchema);

const adImpressionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  adProvider: String,
  event: String,
  revenueReported: Number,
  creditedToUser: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const AdImpression = mongoose.model('AdImpression', adImpressionSchema);

const taskSchema = new Schema({
  title: String,
  description: String,
  countryCodes: [String],
  points: Number,
  createdAt: { type: Date, default: Date.now }
});
const Task = mongoose.model('Task', taskSchema);

const withdrawalSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  method: String, // jazzcash / paypal
  destinationDetails: Schema.Types.Mixed,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  paidAt: Date
});
const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);

module.exports = { User, Transaction, AdImpression, Task, Withdrawal };
