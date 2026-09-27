import mongoose from "mongoose"
import dotenv from 'dotenv'

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI); 
        console.log("Sucessful !!")
    }   catch (error) {
        console.log("Not  Sucessful !!")
    }
}



export default ConnectDB


