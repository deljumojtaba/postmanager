const path = require('path')
const AuthenticationController = require('./controllers/AuthenticationController')
const PostsController = require('./controllers/PostsController')
const multer = require('multer');
const uploadAvatar = require('./tools/uploadAvatar');
const Post = require('../src/models/post.model')
const User = require('../src/models/user.model')
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport');




module.exports = (router) => {
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
  })

  router.post('/api/register', (req, res) => {
    AuthenticationController.register(req, res)
  })

  router.post('/api/login', (req, res) => {
    AuthenticationController.login(req, res)
  })
  router.post('/api/addadmin', (req, res) => {
    AuthenticationController.addadmin(req, res)
  })


  router.get('/api/posts', (req, res) => {
    PostsController.index(req, res)
  })

  router.post('/api/create', (req, res) => {
    PostsController.createPost(req, res)
  })

  router.post('/api/page', (req, res) => {
    PostsController.changePage(req, res)
  })

  router.get('/api/post/:id', passport.authenticate('jwt', { session: false }),(req, res) => {
    PostsController.viewOne(req, res)
  })
  router.post('/api/user_posts', (req, res) => {
    PostsController.userPosts(req, res)
  })

  router.get('/api/edit/:id', (req, res) => {
    PostsController.viewOne(req, res)
  })

  router.post('/api/save_post', (req, res) => {
    PostsController.savePost(req, res)
  })

  router.get('/api/delete/:id', (req, res) => {
    PostsController.deletePost(req, res)
  })

  router.post('/api/user', (req, res) => {
    AuthenticationController.getUser(req, res)
  })

  router.post('/api/save_user', (req, res) => {
    AuthenticationController.saveUser(req, res)
  })
  router.post('/api/delete_user' , (req, res) => {
    AuthenticationController.deleteUser(req, res)
  })
  router.post('/api/upload_avatar', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    
});
router.post('/api/add_comment', passport.authenticate('jwt', { session: false }), (req, res) => {
  PostsController.addComment(req, res)
  
});
// router.post('/api/get_comment', passport.authenticate('jwt', { session: false }), (req, res) => {
//   PostsController.getComment(req, res)
  
// });



}