const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    instagram : [String],
    image : String,
    url : String,
    created_at : { type: Date, default: Date.now },
    active: Boolean
},{
    collection: 'user'
});

module.exports = mongoose.model('User', userSchema);
