import express from 'express'
import {newProduct} from '../Controllers/productController.js'
// import {}from '../Controllers/'
// import { signup, superuser } from '../Controllers/authController';
import { isAdmin } from '../middleware/isAdmin.js';
import { verify } from '../middleware/verify.js';
const app = express()
const Router = express.Router();


// app.use(isAdmin)
Router.post('/newProduct',verify,isAdmin,newProduct)
// Router.get('/getProduct',getProduct)
// Router.get('/bestSellingProduct',bestSellingProduct)
// Router.get('/TrendingProduct',TrendingProduct)
// // Router.get('/details',details)
// Router.get('user',signup)
// Router .post('/superuser',superuser)




export default Router

