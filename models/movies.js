const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    id: Number,
    title: String,
    watched: Date,
    description: String,
    release_date: Date,
    language: String
})

module.exports = mongoose.model('movie', movieSchema);