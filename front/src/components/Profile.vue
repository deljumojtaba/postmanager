<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md4 class="text-xs-center">
        <v-avatar :size="size">
          <v-img
            :src="imgPreUrl + user.avatar"
             id="avatarImage"
             alt="User Picture"
          ></v-img>
        </v-avatar>
        <div class="file">
                    <v-form @submit.prevent="changeProfilePicture" enctype="multipart/form-data">
                        <div class="fields d-flex flex-wrap justify-content-center">
                            <input
                                class="col-6 text-center"
                                type="file"
                                ref="file"
                                accept="image/*"
                                @change="pictureSelect"
                            />
                        </div>
                        <div class="fields">
                            <v-btn flat color="green" class="mt-2" @click="changeProfilePicture">
              <v-icon class="mr-1">cloud_upload</v-icon>
                              Upload</v-btn>
                        </div>
                    </v-form>
                    <form @submit.prevent="deleteProfilePicture" enctype="multipart/form-data">
                        <div class="fields">
                            <v-btn flat color="red" class="mt-2">
              <v-icon class="mr-1" @click="deleteProfilePicture">cloud_off</v-icon>
                              Delete</v-btn>
                        </div>
                    </form>
                </div>
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
import FormData from "form-data";
import { constants } from "fs";
import { connect } from "tls";
import axios from 'axios'
export default {
  name: 'Profile',
  data: () => ({
    size: 200,
    user: {},
    items: [],
    imgPreUrl: "http://localhost:3100/images/profile-pictures/",
    file: ""
  }),
   
  methods: {
    setData (user) {
      this.user = user
      this.items = [
        { icon: 'alternate_email', title: 'E-mail', subtitle: this.user.email },
        { icon: 'person', title: 'Username', subtitle: this.user.username },
        { icon: 'face', title: 'firstName', subtitle: this.user.firstName ? this.user.firstName : 'No information' },
        { icon: 'face', title: 'lastName', subtitle: this.user.lastName ? this.user.lastName : 'No information' },
        { icon: 'phone_iphone', title: 'mobile', subtitle: this.user.mobile ? this.user.mobile : 'No information' },
        { icon: 'avatar', title: 'avatar', subtitle: this.user.avatar ? this.user.avatar : 'No information' }

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
    
    async AllUsers() {
      // PostService.getAllUser()
      // .then(() => this.$router.push('/allusers'))
        // .catch(error => console.log(error))
        this.$router.push('/allusers')

    },
  
    async pictureSelect() {
      const file = this.$refs.file.files[0];
      this.file = file;
      },
    async changeProfilePicture() {
      const formData = new FormData()
      formData.append("file", this.file)
      await PostService.uploadAvatar(formData)
      const user = await PostService.userinfo()
      this.user = user 



    },
    async  deleteProfilePicture() {
      await PostService.deleteAvatar()
      const user = await PostService.userinfo()
      this.user = user 
      
      
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
        { icon: 'phone_iphone', title: 'mobile', subtitle: this.user.mobile ? this.user.mobile : 'No information' },
        { icon: 'avatar', title: 'avatar', subtitle: this.user.avatar ? this.user.avatar : 'No information' }
        
      ]
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
