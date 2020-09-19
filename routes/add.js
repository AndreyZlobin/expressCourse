const { Router } = require('express')
const router = Router()
const DataBase = require('../models/dataBase')


router.get('/', (req, res) => {
  res.render('add', {
    title: 'add',
    isAdd: true
  })
})
router.post('/', async(req, res) => {

  const {title, price, img} = req.body
  const data = new DataBase(title, price, img)

  await data.save()

  res.redirect('/courses')

})

module.exports = router