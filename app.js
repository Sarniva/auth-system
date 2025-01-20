const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const connectDB = require('./config/db.js')

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})