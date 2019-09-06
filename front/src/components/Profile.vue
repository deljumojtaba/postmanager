<template>
  <v-container>
    <v-layout row wrap>

      <v-flex xs12 md4 class="text-xs-center">
        <v-avatar :size="size" >
          <img src="https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_200x200_v1.png" alt="avatar" avatar @click="addavatar(user._id)">
        </v-avatar>
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
            <v-btn :to="'/edit_user'" dark color="primary" class="mt-2">Edit info</v-btn>
             <v-btn dark color="red" @click="removeUser(user)">
              <v-icon class="mr-1">delete</v-icon>
              delete
      
            </v-btn>

          </div>
        </v-list>
      </v-flex>
  <p v-if="user.role===admin">
          admin panel </p>
    </v-layout>
  </v-container>
</template>

<script>
import store from '@/store/store'
import PostService from '../services/PostService'
export default {
  name: 'Profile',
  data: () => ({
    size: 200,
    user: {},
    items: []
  }),
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
    showDialog () {

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
