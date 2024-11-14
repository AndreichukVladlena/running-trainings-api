const runService = require("../services/runRecords");

async function create(req, res) {
  const { distance, time, date } = req.body;
  const userId = req.user._id;

  try {
    const runRecord = await runService.create(userId, distance, time, date);
    res.status(201).json(runRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function readUsersRuns(req, res) {
  const userId = req.user._id;

  try {
    const runs = await runService.readRunRecordsByUserId(userId);
    res.json(runs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function readRunsById(req, res) {
  const { id } = req.params;

  try {
    const runRecord = await runService.readRunRecordById(id);
    if (runRecord) {
      res.json(runRecord);
    } else {
      res.status(404).json({ error: "Run record not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedRunRecord = await runService.update(id, updates);
    if (updatedRunRecord) {
      res.json(updatedRunRecord);
    } else {
      res.status(404).json({ error: "Run record not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function remove(req, res) {
  const { id } = req.params;

  try {
    const deletedRunRecord = await runService.remove(id);
    if (deletedRunRecord) {
      res.json({ message: "Run record deleted successfully" });
    } else {
      res.status(404).json({ error: "Run record not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { create, readUsersRuns, readRunsById, update, remove };
