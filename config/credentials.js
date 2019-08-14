const STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'test';
exports.config = require("../config/credentials.json")[STAGE];
