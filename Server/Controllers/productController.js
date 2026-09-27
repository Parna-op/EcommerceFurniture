import cloudinary from "cloudinary";
import streamifier from "streamifier";
// import { upload } from '../middleware/upload'
import Products from "../Models/ProductModel.js";
import Order  from '../Models/orderModel.js'
export const getProduct = async (req, res) => {
  try {
    const item = await Products.find();
    console.log(item);

    if (!item)
      return res.status(403).json({ meeage: " no product available " });
    res.status(200).json({
      message: "successful",
      products: item,
    });
  } catch (error) {
    res.status(500).json({
      message: "unsuccessful",
      error: error,
    });
  }
};

export const newproduct = async(req, res) => {
    try {
    const item = await Products.find().sort({ createdAt: -1 })
      .limit(4);
    console.log(item);

    if (!item)
      return res.status(403).json({ meeage: " no product available " });
    res.status(200).json({
      message: "successful",
      products: item,
    });
  } catch (error) {
    res.status(500).json({
      message: "unsuccessful",
      error: error,
    });
  }
}

export const bestSellingProduct = async (req, res) => {
  try {

    const bestSelling = await Order.aggregate([

      // Only paid orders
      { $match: { isPaid: true } },

      { $unwind: "$orderItems" },

      {
        $group: {
          _id: "$orderItems.product",
          totalSold: { $sum: "$orderItems.qty" }
        }
      },

      { $sort: { totalSold: -1 } },

      // Join product collection
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },

      { $unwind: "$product" },

      // Merge product fields + totalSold
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$product",
              { totalSold: "$totalSold" }
            ]
          }
        }
      },

      { $limit: 4 }

    ]);

    if (bestSelling.length === 0) {
      return res.status(404).json({
        message: "No best selling products found"
      });
    }

    res.status(200).json({
      message: "successful",
      products: bestSelling
    });

  } catch (error) {
    res.status(500).json({
      message: "unsuccessful",
      error: error.message
    });
  }
};


export const newProduct = async (req, res) => {

  console.log(req);
  try {
    const { name, price, stock,description,catagories } = req.body;
    if (!name || !price || !stock) return res.status(401);
    const existing = await Products.findOne({ name });

    if (existing) {
      return res.status(409).json({
        message: "Product already exists",
      });
    }

    const file = req.file;
console.log("okk1");

    if (!file) return res.status(401);
    const cloudinaryStream = cloudinary.v2.uploader.upload_stream(
      { folder: "/products" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }
        try{
          const product = await Products.create({
            name,
            price,
          stock,
          catagories,
          description,
          url: result.secure_url,
          public_id: result.public_id,
        });
        product.save();
        // console.log("product :",product);
        
        res.status(201).json({
          message: "Product created successfully",
          product,
        });
      
        
      }catch (dbError) {
             if (result?.public_id) {
              await cloudinary.v2.uploader.destroy(result.public_id);
            }
            if (dbError.code === 11000) {
              return res.status(409).json({
                message: "Product already exists",
              });}}
            }
            
          )
          console.log("okk2");
          streamifier.createReadStream(req.file.buffer).pipe(cloudinaryStream);
    
    //  res.status(201).json({
    //       message: "Product created successfully",
    //       // product,
    //     });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const removeproduct = async (req,res) =>{

  try {
    

   const { id } = req.params;
   if (!id) return res.status(403)
    const item = await Products.findById(id);
  console.log(item);
  if (!item) {
    return res.status(404).json({ message: "Product not found" });
  }
    try{
       await Products.findByIdAndDelete(id)
      
    }
    catch(dbError){
      res.status(500).json({
        message:"Product is not deleted",
        dbError
      })

    }
    await cloudinary.v2.uploader.destroy(item.public_id); 

    res.status(200).json({
        message:"Product is deleted",
      })
    
   } catch (error) {  res.status(500).json({
        message:"Product is not deleted",
        error
      })
    
  }

  
}
export const updateproduct = async(req,res) =>{}

