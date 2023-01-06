const mongoose=require('mongoose')
const dotenv=require('dotenv')
const connectDB=require('./config/config')
const itemModel=require('./models/item-model')
const items=require('./utils/data')

require('colors')

// config
dotenv.config();
connectDB()

// finction seeder

const importData=async()=>{
    try {
        await itemModel.deleteMany();
        const itemsData=await itemModel.insertMany(items);
        console.log("All items added" .bgGreen)
        process.exit()
    } catch (error) {
        console.log(`Error : ${error}` .bgRed.inverse)
        process.exit(1);
    }
}

importData()