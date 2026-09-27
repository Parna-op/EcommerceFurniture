import express from "express";
import {newProduct,getProduct,bestSellingProduct,removeproduct,updateproduct,newproduct}from '../Controllers/productController.js'
import {upload} from "../middleware/upload.js"
import { imageUpload } from "../Controllers/imageController.js";


const Router = express.Router();
Router.post("/newProduct", upload.single("productImage"), newProduct);
Router.get("/getProduct", getProduct);
Router.delete("/removeproduct/:id", removeproduct);
Router.get('/updateproduct',upload.single("productImage"),updateproduct)
Router.get("/newproduct", newproduct);
Router.get("/bestSellingProduct", bestSellingProduct);
Router.get("/updateproduct", updateproduct);

export default Router
