const RunRecord = require("../models/RunRecord");

async function create(userId, distance, time, runDate) {
  return await RunRecord.create({ userId, distance, time, runDate });
}

async function readRunRecordsByUserId(userId) {
  return await RunRecord.find({ userId });
}

async function readRunRecordById(recordId) {
  return await RunRecord.findById(recordId);
}

async function update(recordId, updates) {
  return await RunRecord.findByIdAndUpdate(recordId, updates, { new: true });
}

async function remove(recordId) {
  return await RunRecord.findByIdAndDelete(recordId);
}

module.exports = {
  create,
  readRunRecordsByUserId,
  readRunRecordById,
  update,
  remove,
};
