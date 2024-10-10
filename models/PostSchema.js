const { default: mongoose } = require("mongoose");

let PostSchema = new mongoose.Schema({
    tweet:{
        type:String
    },
    image:{
        type:String
    },
    video:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('posts', PostSchema)