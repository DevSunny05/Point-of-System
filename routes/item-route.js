const express=require('express');
const { getItemController,postItemController,editItemController,deleteItemController } = require('../controllers/item-controller');
const router=express.Router()

// routers
// get items

router.get('/get-item',getItemController)

// post items
router.post('/add-item',postItemController)

// edit items
router.put('/edit-item',editItemController)

// delete item
router.post('/delete-item',deleteItemController)





module.exports=router;