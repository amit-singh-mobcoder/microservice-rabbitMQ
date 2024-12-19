import express from 'express'
import {getUserProducts} from '../controllers/product.controller.js'
const router = express.Router()

router.route('/').get(getUserProducts)


export default router;