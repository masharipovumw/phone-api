import { all, run } from '../dbhelper.js'

export const AllPhones = async (req, res) => {
    const sql = 'SELECT * FROM phons;'

    const rows = await all(sql)

    res.status(200).json({
        message: 'All phons',
        phones: rows,
    })
}

export const addPhone = async (req, res) => {
    const { model, description, shortDescription, price, type } = req.body
    const image = req.file.filename

    const sql = `INSERT INTO phons(model, description,shortDescription, price, image, type) 
    VALUES (?, ?, ?, ?, ?,?);`

    await run(sql, [model, description, shortDescription, price, image,type])

    res.status(201).json({
        message: 'phone was added',
    })
}

export const deletePhone = async (req, res) => {
    const id = +req.params.id

    const sql = `DELETE FROM phons WHERE id = ?;`

    await run(sql, [id])

    res.status(201).json({
        message: 'phone was deleted',
    })
}

export const changePhone = async (req, res) => {
    const id = +req.params.id

    const { model, description, shortDescription, price, } = req.body
    const image = req.file.filename

    const sql = `UPDATE phons SET model = ?, description = ?,shortDescription = ? , price = ? ,image = ? WHERE id = ?;`

    await run(sql, [model, description, shortDescription, price, image, id])

    res.status(201).json({
        message: 'phone was changed',
    })
}
