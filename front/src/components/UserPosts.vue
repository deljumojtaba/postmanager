<template>
 <v-container>
    <v-layout row wrap>
      <v-flex xs12 md4 class="text-xs-center">
 <v-app id="inspire">
  <v-simple-table dense>
    <thead>
      <tr>
        <th class="text-left">num</th>
        <th class="text-left">title</th>
        <th class="text-left">date</th>
      </tr>
    </thead>
    <tbody>
      
        <tr v-for="(item , index) in posts" :key="item">
          <td>{{index+1}}</td>
          <td>{{item.title}}</td>
              <td>{{ item.created | moment("MMMM Do YYYY")}}</td>
          
        </tr>
      
      
    </tbody>
   </v-simple-table>
  </v-app>
</v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import store from '@/store/store'
import PostService from '../services/PostService'
export default {
   name: 'UserPosts',
    data: () => ({
      posts:null
      
    }),

 
  
    beforeRouteEnter (to, from, next) {
    const user = store.getters.getUser
    
      next()
    },
     async mounted () {
      const user = store.getters.getUser
      const posts = await PostService.userPosts(user)
      console.log(posts)
      this.posts = posts ;
  }
  

     
  

}
</script>

<style>

</style>