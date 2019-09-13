import Api from '@/services/Api'

export default {
  async index () {
    const response = await Api().get('/api/posts')
    return response.data
  },
  async createPost (credentials) {
    const response = await Api().post('/api/create', credentials)
    return response.data
  },
  async changePage (page) {
    const response = await Api().post('/api/page', page)
    return response.data
  },
  async single (id) {
    const response = await Api().get('/api/post/' + id)
    console.log(response.data)
    return response.data
  },
  async savePost (credentials) {
    const response = await Api().post('/api/save_post', credentials)
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
  async uploadAvatar (credentials) {
    const response = await Api().post('/api/upload_avatar', credentials)
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
  }
}
