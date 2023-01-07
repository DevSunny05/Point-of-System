const itemModel=require('../models/item-model')

 const getItemController=async(req,res)=>{
    try {
        const items=await itemModel.find()
        return res.status(200).json(items)
    } catch (error) {
        console.log(error)
    }
}

const postItemController=async(req,res)=>{
    try {
        const newItem=new itemModel(req.body)
        await newItem.save()
        return res.status(201).send("Item created successfully")
    } catch (error) {
        return res.status(400).json(error)
        console.log(error)
    }
}

module.exports={getItemController,postItemController};