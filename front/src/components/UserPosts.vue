<template>
  
</template>

<script>
import store from '@/store/store'
import PostService from '../services/PostService'
export default {

 
  
    beforeRouteEnter (to, from, next) {
    const user = store.getters.getUser
    
      next()
    },
     async mounted () {
      const user = store.getters.getUser
      const posts = await PostService.userPosts(user)
      console.log(posts)
  }
  

     
  

}
</script>

<style>

</style>