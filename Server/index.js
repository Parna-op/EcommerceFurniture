import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import ConnectDB from './config/dbConfig.js'
// import userRoute from '/Emni/Server/Router/userRoute.js'
import authRoute from './Router/authRoute.js'
import productRoute from './Router/productRoute.js'
import orderRoute from './Router/orderRoutes.js'
import userRoute from './Router/userRoute.js'
import cloudinary from 'cloudinary'
import adminRoute from './Router/adminRoute.js'
// import { verify } from 'jsonwebtoken'
import path from 'path'

const app = express();
const __dirname =path.resolve()
// const __dirname = path.dirname(__filename);
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://yourdomain.com",
// ];

app.use(cors(
  {
  origin:process.env.FORNTEND_PORT,
  credentials: true,
}
));


// app.use(express.json());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

ConnectDB()

// app.use('/user',userRoute)
app.use('/auth',authRoute)
// app.use(verify)
app.use('/product',productRoute)
app.use('/order',orderRoute)
// app.use('/payemnt',orderRoute)
app.use('/admin',adminRoute)
// app.use('/search',searchRoute)
app.use('/user',userRoute)






app.use(express.static(path.join(__dirname,'/Client/dist')))

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "Client/dist/index.html"));
});




app.listen(process.env.PORT,()=>{
    console.log(`server listening on ${process.env.PORT}`)
})


