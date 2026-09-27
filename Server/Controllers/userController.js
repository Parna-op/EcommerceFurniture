// import user from "../Models/userModel.js";
// import { generateToken } from "../utils/jwtGererate.js";
// export const newUser = async (req, res) => {
//   try {
//     const { username, password, email } = req.body;
//     if (!username)
//       return res.status(401).json({
//         message: "username is not there..",
//       });
//     if (!password)
//       return res.status(401).json({
//         message: "password is not there..",
//       });
//     if (!email)
//       return res.status(401).json({
//         message: "email is not there..",
//       });
//     const newUser = await user.create({ username, email, password });
//     // const newuser = new user(data)
//     //   newuser.save()
//     const  payload ={
//         id:newUser.id,
//         user :newUser.username
//     }
//     const  token = generateToken(payload)
//     res.status(200).json({
//       user: newUser,
//       token : token
//     });
//   } catch (error) {
//     res.status(400).json({
//         message :"server error.."
//     });
//     console.log(error);
//   }
// };

// exportn 

import user from '../Models/userModel.js'
export const getAllUser = async (req,res) => {
    try {
        const allUser = await user.find();
       if(!allUser) return res.status(401).json({
        success :false,
        message : "No user founded"
       })
        res.status(200).json({
            success :true,
            allUser
        })
        
    } catch (error) {
        res.status(500).json({
            success :false,
            message:"Internal Server Error"
        })
        
    }

}
export const getAllAdmin = async (req,res) => {
    try {
        const allAdmin = await user.find((user)=>user.role ==="admin");
       if(!allAdmin) return res.status(401).json({
        success :false,
        message : "No user founded"
       })
        res.status(200).json({
            success :true,
            allAdmin
        })
        
    } catch (error) {
        res.status(500).json({
            success :false,
            message:"Internal Server Error"
        })
        
    }

}


