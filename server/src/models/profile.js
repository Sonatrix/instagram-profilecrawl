const mongoose = require('mongoose');
const {Schema} = mongoose;

const profileSchema = new mongoose.Schema({
    username : String,
    alias : String,
    bio : String,
    prof_img : String,
    followers : {
        count: { type: Number}
    },
    following : {
        count: { type: Number}
    },
    num_of_posts : Number,
    bio_url : String,
    isprivate : Boolean,
    scraped : { type: Date, default: Date.now },
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now },
    posts : [Schema.Types.Mixed]
},{
    collection: 'profile'
}
);

module.exports = mongoose.model('Profile', profileSchema);
