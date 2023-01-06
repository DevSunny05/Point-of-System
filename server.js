const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cors=require('cors')
const dotenv=require('dotenv')
const connectDB=require('./config/config')
require('colors')

// dotenv config
dotenv.config()
// db config
mongoose.set('strictQuery', true);
connectDB();

// rest app
const app=express();

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))


// routes
app.use('/api/items',require('./routes/item-route'))

// port
const PORT=process.env.PORT || 8080


// listen
app.listen(PORT,()=>{
    console.log(`Server rening on PORT ${PORT}`.bgCyan.white);
})
