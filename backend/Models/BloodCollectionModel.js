import mongoose from 'mongoose';



const BloodCollectionModel = new mongoose.Schema({
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
  bloodgroup:{
    type: String,
    required: true,

  },
  gender: {
    type: String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  }

});

export const BloodCollection = mongoose.model('BloodCollection', BloodCollectionModel);