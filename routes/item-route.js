const express=require('express');
const { getItemController } = require('../controllers/item-controller');
const router=express.Router()

// routers
// get items

router.get('/get-item',getItemController)





module.exports=router;