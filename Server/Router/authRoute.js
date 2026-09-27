import express from 'express'
import {signup,login,refresh,logout,checkuser} from '../Controllers/authController.js'
// import verifyjwt from '../middleware/verifyjwt.js'
import { verify }from '../middleware/verify.js'
const Router = express.Router()

Router.post('/signup',signup)           
Router.post('/login',login)           
Router.get('/refresh',refresh)
Router.get('/logout',logout)
Router.get('/checkuser',verify,checkuser)

export default Router