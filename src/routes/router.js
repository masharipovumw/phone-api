import { Router } from 'express'
import phone from './phones.routes.js'
import product from './userProduct.routes.js'
import user from './users.routes.js'

const router = Router()

router.use('/phones', phone)
router.use('/users', user)
router.use('/product', product)

export default router
