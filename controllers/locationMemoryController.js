const LocationMemory = require('../model/LocationMemoryRecord');

const getAllRecordss = async (req, res) => {
    const recods = await LocationMemory.find();
    if (!recods) return res.status(204).json({ 'message': 'No recods found' });
    res.json(recods);
}

const createRecord = async (req,res) => {
    const { record, username } = req.body;
    if (!username || !record) return res.status(400).json({ 'message': 'Username and record are required.' });

    const result = await LocationMemory.create({
        "username": username,
        "record": record
    });
    res.json(result)
}

const updateRecord = async (req,res) => {
    if (!req?.params?.username) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const record = await LocationMemory.findOne({ username: req.params.username }).exec();
    if (!record) {
        return res.status(204).json({ "message": `No Worker matches ID ${req.body.username}.` });
    }
    if (req.body?.record) record.record = req.body.record;
    if (req.body?.username) record.username = req.body.username;

    const result = await record.save();
    res.json(result);
}

const getRecord = async (req, res) => {
    if (!req?.params?.username) return res.status(400).json({ "message": 'User ID required' });
    const record = await LocationMemory.findOne({ username: req.params.username }).exec();
    if (!record) {
        return res.status(204).json({ 'message': `User ID ${req.params.username} not found` });
    }
    res.json(record);
}

module.exports = {
    getAllRecordss,
    createRecord,
    updateRecord,
    getRecord


}