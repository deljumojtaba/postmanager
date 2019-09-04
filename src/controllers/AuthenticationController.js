const jwt = require('jsonwebtoken')
const database = require('../database')

module.exports = {
  async register (req, res) {
    try {
      const user = await new database.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        username: req.body.username,
        password: req.body.password,
        role: 'bloger',
        email:req.body.email,
        sex: req.body.sex}).save()
      res.json(user)
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  async addadmin (req, res) {
    try {
      const user = await new database.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        username: req.body.username,
        password: req.body.password,
        role: 'admin',
        email:req.body.email,
        sex: req.body.sex}).save()
      res.json(user)
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await database.User.findOne({email: email})

      if (!user) {
        res.status(400).send({ success: false, message: 'User not found' })
      } else {
        database.comparePassword(password, user.password)
          .then(() => {
            const token = jwt.sign(user.toJSON(), "1234567890", {
              expiresIn: 604800 // 1 week
            })
            res.json({
              success: true,
              token: `jwt ${token}`,
              user: user.toJSON()
            })
          })
          .catch(err => {
            console.log(err)
            res.json({ success: false, message: 'Wrong password' })
          })
      }
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  async getUser (req, res) {
    try {
      const user = await database.User.findById(req.body.id)
      res.json(user)
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  async saveUser (req, res) {
    try {
      const newUser = await database.User.findByIdAndUpdate(req.body._id, req.body)
      console.log(newUser)
      res.json({ success: true, message: 'User has been updated' })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  }
}
