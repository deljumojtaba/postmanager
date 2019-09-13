const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    
    text: {
        type: String,
        minlength: 2

    },
    author: {
        type: String,
        required: true
        
      },
   
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
   
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment ;