const router = require('express').Router()
const userController = require('../controller/User')


router.post('/register', (req, res) => {
    userController.register(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.post('/login', (req, res) => {
    userController.login(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/getAllUser', (req, res) => {
    userController.getAllUser()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.delete('/delete/:id', (req, res) => {
    userController.delete(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.json(err))
})

router.get('/getbyid/:id', (req, res) => {
    userController.getById(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.json(err))
})

router.put('/edit/:id', (req, res) => {
    userController.edit(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })

module.exports = router