import mongoose from 'mongoose';


const FCModel = new mongoose.Schema({
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
  description:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  }
});

export const FCCollection = mongoose.model('FCCollection', FCModel);