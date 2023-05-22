import { get, run, all } from '../dbhelper.js'

export const orderPhone = async (req, res) => {
    // console.log(price)
    console.log(req.body)
    const user = res.locals.user
    const userId = user.id
    const { phonId, count } = req.body
    const priceSql = 'SELECT price FROM phons WHERE id = ?'
    const phone = await get(priceSql, [phonId])
    const price = phone.price


    const date = new Date().toDateString()
    const sql = `INSERT INTO orders (userId, phonId, count,price,  date) VALUES (?, ?, ?, ?, ?);`

    await run(sql, [userId, phonId, count, price, date])

    res.json({
        message: 'you bouhgt phon',
    })
}

export const userOrders = async (req, res) => {
    const userId = res.locals.user.id

    // name, description, price, count, date
    const sql = `SELECT 
    orders.id as id,
    phons.model AS model, phons.description AS description,
    phons.shortDescription As shortDescription,
    phons.type AS type,
    phons.image AS image,
    orders.count as count, orders.date as date,
    orders.price as price
    FROM orders 
    INNER JOIN phons ON orders.phonId = phons.id 
    WHERE orders.userId = ?
    `

    const orders = await all(sql, [userId])

    res.status(200).json({
        message: 'Your orders',
        orders: orders,
    })
}

export const allOrders = async (req, res) => {
    const sql = `
    SELECT orders.id as id, orders.phonId as phonId,
    orders.date as date, orders.count as count,
    phons.model as model, phons.price as price,
    users.name || ' ' || users.surname as user
    FROM orders
    INNER JOIN phons ON phons.id = orders.phonId
    INNER JOIN users ON users.id = orders.userId;
    `

    const orders = await all(sql)

    res.json({
        message: "All orders",
        orders
    })
}

export const declineOrder = async (req, res) => {
    const id = req.params.id

    const sql = 'DELETE FROM orders WHERE id = ?'

    await run(sql, [id])

    res.json({
        message: 'Order declined'
    })
}
