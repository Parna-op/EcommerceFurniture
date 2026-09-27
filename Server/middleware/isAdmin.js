import user from '../Models/userModel.js'

export const isAdmin = async (req,res, next) =>{
    try {
        const person= req.user
        if (!person) return res.status(403)
        const valid = await user.findOne({ firstname: person.firstname, email: person.email })
        if (!valid) return res.status(403)
        if (person.role !== valid.role){
                 return res.status(403).json({
                    message: "Unarthorized user",
                    // redirect:'/login'
                })
            }
                res.status(200)
                .json({message: "arthorized user"})
                next()
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal Server error"
        })
        
    }
}