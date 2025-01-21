const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer','')

    if(!token) return res.status(400).json({error:"Access denied"});
    



}