const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ReviewSchema = new schema ({
    reviewId: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: String,
        required: true
    },
    audioId: {
        type: String,
        required: true
    },
    parentId:{
        type: String
    },
    commment:{
        type: String,
        required: true
    }
});

const Review = mongoose.model('reviews', ReviewSchema);

module.exports = Review;