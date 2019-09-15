import Api from '@/services/Api'

export default {
  async index () {
    const response = await Api().get('/api/posts')
    return response.data
  },
  async createPost (formData) {
    const response = await Api().post('/api/create', formData)
    return response.data
  },
  async addPostImage (formData) {
    const response = await Api().post('/api/add_post_image', formData)
    console.log(response.data)
    return response.data
  },
  async changePage (page) {
    const response = await Api().post('/api/page', page)
    return response.data
  },
  async single (id) {
    const response = await Api().get('/api/post/' + id)
    return response.data
  },
  async savePost (formData) {
    const response = await Api().post('/api/save_post', formData)
    return response.data
  },
  async deletePost (id) {
    const response = await Api().get('/api/delete/' + id)
    return response.data
  },
  async getUser (userID) {
    const response = await Api().post('/api/user', userID)
    return response.data
  },
  async saveUser (user) {
    const response = await Api().post('/api/save_user', user)
    return response.data
  },
  async deleteUser (userID) {
    const response = await Api().post('/api/delete_user', userID)
    return response.data
  },
  async userPosts (user) {
    const response = await Api().post('/api/user_posts', user)
    return response.data
  },
  async uploadAvatar (FormData) {
    const response = await Api().post('/api/add_avatar', FormData)
    console.log(response.data)
    return response.data
  },
  async addComment (id,textComment) {
    const response = await Api().post('/api/add_comment', {
     textComment,
      id
    })
    return response.data
  },
  async getComments (id) {
    const response = await Api().get('/api/get_comment/' + id)  
  return response.data
  },
  async getAllUser () {
    const response = await Api().get('/api/all_users')
    return response.data
  },
  async deleteAvatar () {
    const response = await Api().get('/api/delete_avatar')
    return response.data
  },
  async userinfo () {
    const response = await Api().get('/api/userinfo')
    return response.data
  },
}
