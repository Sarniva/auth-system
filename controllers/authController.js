const User = require("../models/User.js")
const jwt = require('jsonwebtoken')

const registerUser = async (req,res)=>{
    const {username, email,password} = req.body
    try {
        const user = new User({username,email,password})
        await user.save()
        res.status(201).json({message:"User registered successfully"})
    } catch (err) {
        res.status(400).json({error : err.message})
    }
}


const loginUser = async(req,res)=>{
    const {email,password}= req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Invalid credential"})
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({error:"Invalid credential"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.json({token})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

const getCurrentUser = async (req,res)=>{
    try {
        const user = await User.findById(req.userId).select('-password')
        res.json(user)
        
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

module.exports = {registerUser,loginUser,getCurrentUser}