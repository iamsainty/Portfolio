const mongoose = require('mongoose');

const blogCommentSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId
    },
    comment: {
        type: String
    },
    commentDate: {
        type: Date,
        default: Date.now
    },
    commentStatus: {
        type: String,
        default: 'active'
    },
    commentLikes: {
        type: Number,
        default: 0
    }
})

const  BlogComment = mongoose.model('BlogComment', blogCommentSchema);

module.exports = BlogComment;