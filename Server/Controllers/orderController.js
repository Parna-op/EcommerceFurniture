// import products from "../Models/ProductModel.js"

// export const checkout = async(req,res)=>{
//     try {
//         const {items} = req.body
//         // console.log(items);
        
//         if(!items) return res.status(403).json({message : "unforbiden"})
  

//         const { name, email} = req?.user
//          if(!name || !email ) return res.status(403).json({message : "unforbiden"})

//         let totalPrice = 0;
//         await items.map( async(item)=>{
//         const productId = item.id || item._id;
//         const product = await products.find({_id:productId})
//         console.log("product is ",product[0].price);
//         // console.log(product[0].price+10)
//         totalPrice= totalPrice+product[0].price;
//         console.log(totalPrice);
        
//     }
// )
// res.status(200)
//    .json({
//     message: 'success',
//     // body,
//     totalPrice
//    })
// // console.log(totalPrice);
        
           
//     } catch (error) {
//         res.status(500).json({message : " Internal server error"})
//         console.log(error);
        
//     }
// }






import products from "../Models/ProductModel.js";
import razorpay from "../config/paymentConfig.js";
import Order from "../Models/orderModel.js";
// import crypto from 'crypto';
import { createHmac } from 'node:crypto';
// import orders from "razorpay/dist/types/orders.js";
export const checkout = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    // 1. Basic Validation
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in cart" });
    }
    
    // Auth Check
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    let calculatedTotal = 0;
    const dbOrderItems = [];

    // 2. Loop using 'for...of' (Correct way for Async logic)
    for (const item of items) {
      // Handle both .id (frontend) and ._id (backend)
      const productId = item.id || item._id; 
      const quantity = item.quantity || 1; // Default to 1 if missing

      const product = await products.findById(productId);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      // Check Stock
      if (product.countInStock < quantity) {
        return res.status(400).json({ message: `Out of stock: ${product.name}` });
      }

      // Calculate Price (Always use Server Price!)
      calculatedTotal += product.price * quantity;

      // Push to order array
      dbOrderItems.push({
        product: product._id,
        name: product.name,
        qty: quantity,
        image: product.url, // Ensure your Product model has 'image' or 'images[0]'
        price: product.price,
      });
    }

    // 3. Create Razorpay Order
    // CRITICAL: Amount must be in Paise and Integer (Math.round)
    const options = {
      amount: 1000, 
      // amount: Math.round(calculatedTotal * 100), 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if(!razorpayOrder) {
        return res.status(500).json({ message: "Razorpay order creation failed" });
    }

    // 4. Create Database Order (Status: Pending)
    const newOrder = new Order({
      user: req.user._id,
      orderItems: dbOrderItems, // Ensure Schema matches this name
      shippingAddress,
      paymentMethod: 'Razorpay',
      itemsPrice: calculatedTotal,
      totalPrice: calculatedTotal, 
      isPaid: false,
      status: 'Pending', 
      paymentResult: {
        id: razorpayOrder.id, 
        status: 'Pending'
      }
    });

    await newOrder.save();

    // 5. Send Response
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      // amount: options.amount, // Send the paise amount to frontend
      amount: 100, // Send the paise amount to frontend
      currency: "INR",
      order_id: razorpayOrder.id, // Razorpay Order ID
      db_order_id: newOrder._id   // MongoDB Order ID
    });

  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;

    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    // const expectedSignature = crypto
    //   .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    //   .update(body)
    //   .digest("hex");
const expectedSignature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      
      // 2. Find the Order using Razorpay Order ID
      // We look inside 'paymentResult.id' because we saved it in Step 1
      const order = await Order.findOne({ 'paymentResult.id': razorpay_order_id });

      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      // 3. Update Order Status
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: razorpay_payment_id,
        status: 'COMPLETED',
        email_address: req.body.email || "", 
        update_time: new Date().toISOString(),
      };
      order.status = 'Processing'; // Move from Pending to Processing

      await order.save();

      // 4. Reduce Stock (Now it is safe to reduce)
      for (const item of order.orderItems) {
        await products.findByIdAndUpdate(item.product, {
           $inc: { countInStock: -item.qty } 
        });
      }

      // 5. Redirect
      // frontend URL
      // return res.redirect(`http://localhost:5173/paymentsuccess`);
      return res.status(200).json({ success: true, message: "varification sucessful" });
// 
    } else {
      
      // OPTIONAL: Mark order as Failed in DB
      const failedOrder = await Order.findOne({ 'paymentResult.id': razorpay_order_id });
      if(failedOrder) {
          failedOrder.status = 'Cancelled';
          await failedOrder.save();
      }

      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const orderDetails = async (req,res) =>{

      try {
        const orderdetails = await Order.find();
       if(!orderdetails) return res.status(401).json({
        success :false,
        message : " No Order "
       })
        res.status(200).json({
            success :true,
            orderdetails
        })
        
    } catch (error) {
        res.status(500).json({
            success :false,
            message:"Internal Server Error"
        })
        
    }
}