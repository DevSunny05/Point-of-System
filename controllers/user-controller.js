const userModel=require('../models/user-model')

 const loginController=async(req,res)=>{
    try {
        const {userId,password}=req.body
        const user=await userModel.findOne({userId,password,verified:true})
        if(user){
            return res.status(200).send(user)
        }else{
            return res.json({message:"Login fail"})
        }  
    } catch (error) {
        return res.status(404).send(error)   
    }
}

const registerController=async(req,res)=>{
    try {
        const newUser=new userModel({...req.body,verified:true})
        await newUser.save();
        return res.status(200).send("Successfully Register")
    } catch (error) {
        return res.status(400).json(error)
        
    }
}





module.exports={loginController,registerController};