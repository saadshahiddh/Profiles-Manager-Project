const mongoose = require("mongoose");
const { ModelReferences } = require("../utils/database-reference");

const profileSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    stack: { type: String, default: '' },
    type: { type: String, default: '' },
}, { timestamps: true });

profileSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model(ModelReferences.PROFILE, profileSchema);