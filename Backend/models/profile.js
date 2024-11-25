const mongoose = require("mongoose");
const { ModelReferences, PopulateReferences } = require("../utils/database-reference");

const profileSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    stack: { type: String, default: '' },
    type: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: ModelReferences.USER, default: null },
}, { timestamps: true });

profileSchema.virtual(PopulateReferences.SINGLE_USER, { ref: ModelReferences.USER, localField: 'userId', foreignField: '_id', justOne: true });

profileSchema.set('toJSON', { virtuals: true, transform: (doc, rec) => { delete rec.id } });
profileSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model(ModelReferences.PROFILE, profileSchema);