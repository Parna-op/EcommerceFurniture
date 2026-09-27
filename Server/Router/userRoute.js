import express from 'express'
import {getAllUser,getAllAdmin} from '../Controllers/userController.js'

const Router = express.Router();


Router.get('/getalluser',getAllUser)
Router.post('/getalladmin',getAllAdmin)
// Router.post('/cartitem',cartitem)
// Router.post('/cartitem',cartitem)

export default Router;


