import { Router } from 'express'
import multer from 'multer'
import { nanoid } from 'nanoid'
import {
    addPhone,
    AllPhones,
    changePhone,
    deletePhone,
} from '../controller/products.controller.js'
import { authCheck } from '../middlewares/auth-check.js'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './upload')
    },
    filename: (req, file, callback) => {
        callback(null, nanoid(8) + '.jpg')
    },
})
const upload = multer({ storage })
const phone = Router()

phone.get('/', authCheck(false), AllPhones)
phone.post('/', upload.single('image'), addPhone)
phone.delete('/:id', deletePhone)
phone.put('/:id', upload.single('image'), changePhone)

export default phone
