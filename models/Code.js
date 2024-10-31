const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  prize: { type: Number, required: true },
  used: { type: Boolean, default: false },
  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Code', CodeSchema);