const mongoose = require("mongoose");
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

async function getWeeklyReport(userId) {
  return await RunRecord.aggregate([
    { $match: { userId: userId } },

    {
      $addFields: {
        week: { $isoWeek: "$runDate" },
        year: { $isoWeekYear: "$runDate" },
        weekStart: {
          $dateFromParts: {
            isoWeekYear: { $isoWeekYear: "$runDate" },
            isoWeek: { $isoWeek: "$runDate" },
            isoDayOfWeek: 1,
          },
        },
        weekEnd: {
          $dateAdd: {
            startDate: {
              $dateFromParts: {
                isoWeekYear: { $isoWeekYear: "$runDate" },
                isoWeek: { $isoWeek: "$runDate" },
                isoDayOfWeek: 1,
              },
            },
            unit: "day",
            amount: 6,
          },
        },
      },
    },

    {
      $group: {
        _id: { year: "$year", week: "$week" },
        runCount: { $sum: 1 },
        totalDistance: { $sum: "$distance" },
        totalTime: { $sum: "$time" },
        weekStart: { $first: "$weekStart" },
        weekEnd: { $first: "$weekEnd" },
      },
    },
    {
      $project: {
        _id: 0,
        week: "$_id.week",
        year: "$_id.year",
        totalDistance: 1,
        weekStart: 1,
        weekEnd: 1,
        averageSpeed: {
          $round: [{ $divide: ["$totalDistance", "$totalTime"] }, 2],
        },
        averageTime: { $round: [{ $divide: ["$totalTime", "$runCount"] }, 2] },
      },
    },

    { $sort: { year: 1, week: 1 } },
  ]);
}

module.exports = {
  create,
  readRunRecordsByUserId,
  readRunRecordById,
  update,
  remove,
  getWeeklyReport,
};
