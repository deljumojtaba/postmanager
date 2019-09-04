const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const database = require('../database')


module.exports = (passport) => {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = "1234567890"
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    database.User.findOne({_id: jwt_payload._id}, (error, user) => {
      if (error) {
        return done(error, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
