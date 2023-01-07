const express=require('express');
const { getItemController,postItemController } = require('../controllers/item-controller');
const router=express.Router()

// routers
// get items

router.get('/get-item',getItemController)

// post items
router.post('/add-item',postItemController)





module.exports=router;