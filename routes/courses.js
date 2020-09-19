const {Router} = require('express')
const router = Router()
const DataBase = require('../models/dataBase.js')

router.get('/', async (req, res) => {
    const courses = await DataBase.getAll()

    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses
    })
})

module.exports = router