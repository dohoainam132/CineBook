const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    poster: String,

    genre: [String],

    duration: {
        type: Number,
        required: true
    },

    ageRating: String,

    status: {
        type: String,
        enum: ['showing', 'upcoming', 'ended'],
        default: 'upcoming'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);