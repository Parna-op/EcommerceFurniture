import express from'express'
import { checkout,verifyPayment,orderDetails } from '../Controllers/orderController.js';
import { verify } from '../middleware/verify.js';
import { isAdmin } from '../middleware/isAdmin.js';
const router = express.Router();

router.post('/checkout',verify,checkout)
router.post('/verifyPayment',verifyPayment)
router.post('/orderDetails',isAdmin,orderDetails)
export default router