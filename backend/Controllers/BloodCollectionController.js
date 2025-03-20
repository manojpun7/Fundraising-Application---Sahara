import {BloodCollection } from '../Models/BloodCollectionModel.js';



const BloodCollectionController = async (req, res) => {
    try {

       
        const { fullname, phonenumber, email, location,gender,age,bloodgroup } = req.body;

        
        if (!fullname || !phonenumber || !email ||!location  ||!gender ||!age || ! bloodgroup) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

      

       

        console.log(fullname, phonenumber, email, location,gender,age,bloodgroup)
        const bloodCollection = new BloodCollection({fullname, phonenumber, email, location,gender,age,bloodgroup});
        await bloodCollection.save();

        return res.status(200).json({ success: true, message: 'Blood donation application sent sucessfully' });
        
     
        

        

    } catch (error) {
        console.error('Error during application submiting:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const fetchBloodCollection = async(req,res)=>{


try {
  const fetchedBloodCollection = await BloodCollection.find({});
 
  console.log(fetchedBloodCollection)
  res.json({success:true,data:fetchedBloodCollection})

} catch (error) {
console.log(error)
res.json({success:false,message:"Error"})


}


}







export { BloodCollectionController,fetchBloodCollection };