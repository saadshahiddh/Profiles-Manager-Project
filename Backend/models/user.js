const mongoose = require("mongoose");
const { ModelReferences, PopulateReferences } = require("../utils/database-reference");

const userSchema = new mongoose.Schema({
    email: { type: String, default: '' },
    name: { type: String, default: '' },
    password: { type: String, default: '' },
    photo: { type: String, default: '' },
}, { timestamps: true });

userSchema.set('toJSON', { virtuals: true, transform: (doc, rec) => { delete rec.id } });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model(ModelReferences.USER, userSchema);