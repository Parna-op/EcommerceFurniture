import jwt from 'jsonwebtoken'

export const generateToken = (data)=>{
    return jwt.sign(data,process.env.JWT_SECRET)
}
export const verifyToken = (data)=>{
    return jwt.verify(data,process.env.JWT_SECRET);
}