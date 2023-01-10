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
        
    }
}

const editItemController=async(req,res)=>{
    try {
        await itemModel.findOneAndUpdate({_id:req.body.itemId},req.body)
        return res.status(201).send("Item updated")
    } catch (error) {
        return res.status(400).send(error)
    }
}

const deleteItemController=async(req,res)=>{
    try {
        const {itemId}=req.body;
        await itemModel.findOneAndDelete({_id:itemId})
        return res.status(201).send("Item Deleted")
    } catch (error) {
        return res.status(400).send("Unable to delete item")
    }
}

module.exports={getItemController,postItemController,editItemController,deleteItemController};