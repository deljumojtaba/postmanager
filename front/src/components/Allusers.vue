<template>
  <v-container v-if="!isLoading">
      {{users}}
  </v-container>  
</template>

<script>
import store from '@/store/store'
import PostService from '../services/PostService'
export default {
     name: 'Allusers',
  data: () => ({
    users: {},
   
  }),
computed: {
    isLoading () {
      return this.$store.getters.isLoading
    }
},
async mounted () {
    console.log("2222")
    this.$store.dispatch('setLoading', true)
    const result = await PostService.getAllUser()
    if (result) {
      this.$store.dispatch('setLoading', false)
      this.users = result
      
    }
  }
}

</script>


<style>

</style>