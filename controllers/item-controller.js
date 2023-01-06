const itemModel=require('../models/item-model')

 const getItemController=async(req,res)=>{
    try {
        const items=await itemModel.find()
        return res.status(200).json(items)
    } catch (error) {
        console.log(error)
    }
}

module.exports={getItemController};