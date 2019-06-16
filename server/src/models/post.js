const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    caption : String,
    location : [Schema.Types.Mixed],
    imgs : [String],
    imgdesc : [String],
    preview_img : String,
    likes : [Schema.Types.Mixed],
    views : Number,
    url : String,
    date : { type: Date, default: Date.now },
    created_at : { type: Date, default: Date.now },
    comments : [Schema.Types.Mixed],
    mentions : [String],
    tags : [String]
});

module.exports = mongoose.model('Post', postSchema);
