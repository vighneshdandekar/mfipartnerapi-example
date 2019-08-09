const STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
exports.config = require("../config/credentials.json")[STAGE];
