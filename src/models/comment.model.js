const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    
    text: {
        type: String,
        minlength: 2

    },
   
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    },
   
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment ;