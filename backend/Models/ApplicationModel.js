import mongoose from 'mongoose';



const ApplicationModel = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fundamount:{
    type: Number,
    required: true,

  },
  reason: {
    type: String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
 

});

export const Application = mongoose.model('Application', ApplicationModel);


