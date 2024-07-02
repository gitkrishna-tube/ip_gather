const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for your document
const requestDataSchema = new Schema({
    email: { type: String, required: true },
    ip: { type: String, required: true },
    reqObj: { type: Schema.Types.Mixed, required: true } // Mixed type allows any data structure
});

// Create a Mongoose model based on the schema
const RequestData = mongoose.model('RequestData', requestDataSchema);

module.exports = {
    RequestData:RequestData
};
