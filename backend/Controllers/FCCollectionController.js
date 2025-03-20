import { FCCollection } from "../Models/FCModel.js";



const FCCollectionController = async (req, res) => {
    try {

       
        const { fullname, phonenumber, email, location,description } = req.body;

        
        if (!fullname || !phonenumber || !email || !description ||!location) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

         

       

        
        const fcCollection = new FCCollection({fullname, phonenumber, email, location,description});
        await fcCollection.save();
        return res.status(200).json({ success: true, message: 'Application for food and cloth donation submitted successfully' });
        console.log(fullname, phonenumber, email, location,description)
        
     
        

        

    } catch (error) {
        console.error('Error during application submiting:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const fetchFCCollection = async(req,res)=>{


try {
  const fetchedFCCollection = await FCCollection.find({});
 
  console.log(fetchedFCCollection)
  res.json({success:true,data:fetchedFCCollection})

} catch (error) {
console.log(error)
res.json({success:false,message:"Error"})


}


}








export { FCCollectionController , fetchFCCollection };