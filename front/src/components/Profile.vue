<template>
  <v-container>
    <v-layout row wrap>

      <v-flex xs12 md4 class="text-xs-center">
       <image-input v-model="avatar">
        <div slot="activator">
          <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
            <span>Click to add avatar</span>
          </v-avatar>
          <v-avatar size="150px" v-ripple v-else class="mb-3">
            <img :src="avatar.imageURL" alt="avatar">
          </v-avatar>
        </div>
      </image-input>
      <v-slide-x-transition>
        <div v-if="avatar && saved == false">
          <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
        </div>
      </v-slide-x-transition>
      </v-flex>

      <v-flex xs12 md8 class="mt-xs">
        <v-list two-line subheader>
        
          
          <v-list-tile v-for="item in items" :key="item.title" >
            <v-list-tile-avatar>
              <v-icon color="primary">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <div class="text-xs-right">
            <v-btn :to="'/edit_user'" dark color="orange" class="mt-2">
              <v-icon class="mr-1">edit</v-icon>
            Edit info</v-btn>
             <v-btn dark color="red" @click="removeUser(user)">
              <v-icon class="mr-1">delete</v-icon>
              delete
            </v-btn>
            <v-btn dark color="primary" class="mt-2" @click="userAllPosts(user)">
              <v-icon class="mr-1">build</v-icon>
              posts info</v-btn>
             <v-btn v-if="user.role === 'admin'" dark color="green" @click="AllUsers()">
              <v-icon class="mr-1">people</v-icon>
              all users
            </v-btn>


          </div>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from '@/store/store'
import PostService from '../services/PostService'
import ImageInput from '../components/ImageInput.vue'
export default {
  name: 'Profile',
  data: () => ({
    size: 200,
    user: {},
    items: [],
    avatar: null,
      saving: false,
      saved: false
  }),
    components: {
    ImageInput: ImageInput
  },
  methods: {
    setData (user) {
      this.user = user
      this.items = [
        { icon: 'alternate_email', title: 'E-mail', subtitle: this.user.email },
        { icon: 'person', title: 'Username', subtitle: this.user.username },
        { icon: 'face', title: 'firstName', subtitle: this.user.firstName ? this.user.firstName : 'No information' },
        { icon: 'face', title: 'lastName', subtitle: this.user.lastName ? this.user.lastName : 'No information' },
        { icon: 'phone_iphone', title: 'mobile', subtitle: this.user.mobile ? this.user.mobile : 'No information' }
      ]
    },
     async removeUser (user) {
      PostService.deleteUser(user)
      this.$store.dispatch('logoutUser')
        .then(() => this.$router.push('/'))
        .catch(error => console.log(error))
    },
    
    async userAllPosts (user) {

         this.$router.push('/user_posts')
        
    },
      uploadImage() {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
      console.log(FormData)
      PostService.uploadAvatar(FormData)
    },
    savedAvatar() {
      this.saving = false
      this.saved = true
    },
    async AllUsers() {
      // PostService.getAllUser()
      // .then(() => this.$router.push('/allusers'))
        // .catch(error => console.log(error))
        this.$router.push('/allusers')

    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    getUser () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    getUser (newValue) {
      this.user = newValue
      this.items = [
        { icon: 'alternate_email', title: 'E-mail', subtitle: this.user.email },
        { icon: 'person', title: 'Username', subtitle: this.user.username },
        { icon: 'face', title: 'firstName', subtitle: this.user.firstName ? this.user.firstName : 'No information' },
        { icon: 'face', title: 'lastName', subtitle: this.user.lastName ? this.user.lastName : 'No information' },
        { icon: 'phone_iphone', title: 'mobile', subtitle: this.user.mobile ? this.user.mobile : 'No information' }
      ]
    },
    avatar: {
      handler: function() {
        this.saved = false
      },
      deep: true
    }
  },
  beforeRouteEnter (to, from, next) {
    const user = store.getters.getUser
    if (user) {
      next(vm => vm.setData(user))
    } else {
      next()
    }
  }
}
</script>

<style scoped>
  .mt-xs {
    margin-top: 32px;
  }

  @media (min-width: 960px) {
    .mt-xs {
      margin-top: 0;
    }
  }
</style>
