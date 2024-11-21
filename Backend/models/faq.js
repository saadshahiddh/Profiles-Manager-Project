const mongoose = require("mongoose");
const { ModelReferences, PopulateReferences } = require("../utils/database-reference");

const faqSchema = new mongoose.Schema({
    answer: { type: String, default: '' },
    question: { type: String, default: '' },
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: ModelReferences.PROFILE, default: null },
}, { timestamps: true });

faqSchema.virtual(PopulateReferences.SINGLE_PROFILE, { ref: ModelReferences.PROFILE, localField: 'profileId', foreignField: '_id', justOne: true });
faqSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model(ModelReferences.FAQ, faqSchema);