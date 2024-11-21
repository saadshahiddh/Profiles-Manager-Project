const mongoose = require("mongoose");
const { ModelReferences, PopulateReferences } = require("../utils/database-reference");

const coverLetterSchema = new mongoose.Schema({
    description: { type: String, default: '' },
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: ModelReferences.PROFILE, default: null },
});

coverLetterSchema.virtual(PopulateReferences.SINGLE_PROFILE, { ref: ModelReferences.PROFILE, localField: 'profileId', foreignField: '_id', justOne: true });
coverLetterSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model(ModelReferences.COVER_LETTER, coverLetterSchema);