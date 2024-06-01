const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js")

const listingSchema = new Schema({
    title : {
      type : String,
      required :true,
    },
    description : {
       type : String,
       required : true
    },
    image : {
       url : String,
       filename : String
    },
    price: {
      type: Number,
      required: true, // make this required to match Joi schema
      min: 0 // ensuring positive value
    },
    location: {
      type: String,
      required: true, // make this required to match Joi schema
    },
    country: {
      type: String,
      required: true, // make this required to match Joi schema
    },
    reviews :[
      {
        type: Schema.Types.ObjectId,
        ref : "Review",
      }
    ],
    owner :{
      type : Schema.Types.ObjectId,
      ref :"User" 
    },
    geometry :{
      type :{
        type : String,  // 
        enum : ['Point'],  // location must be a point 
        required : true
      },
      coordinates : {
        type : [Number],
        required : true
      }
    },
});

// post mongoose middleware
listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
    await Review.deleteMany( { _id : {$in : listing.reviews}});
  }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;
