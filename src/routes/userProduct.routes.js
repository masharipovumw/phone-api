import { Router } from "express"
import { allOrders, declineOrder, orderPhone, userOrders } from "../controller/userproduts.controller.js"
import { authCheck } from "../middlewares/auth-check.js"

const product = Router()

product.post('/', authCheck(false), orderPhone)
product.delete('/:id', authCheck(false), declineOrder)
product.get('/card', authCheck(false), userOrders)
product.get('/all', authCheck(true), allOrders)

export default product
