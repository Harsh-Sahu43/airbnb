const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMonoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email :{
        type : String,
        required : true
    }
})

userSchema.plugin(passportLocalMonoose);

module.exports = mongoose.model('User', userSchema);
