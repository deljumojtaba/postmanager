<template>
  <v-layout row align-center justify-center>
    <v-flex xs12 md6>
      <panel title="Register">
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="username"
              label="Username"
              type="text"
              v-model="username"
            >
            </v-text-field>
            <v-text-field
              prepend-icon="email"
              name="email"
              label="Email"
              type="text"
              v-model="email"
            >
            </v-text-field>
            <v-text-field
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password"
              v-model="password"
            >
            </v-text-field>
             <v-text-field
              prepend-icon="account_box"
              name="firstName"
              label="firstName"
              type="text"
              v-model="firstName"
            >
            </v-text-field>
             <v-text-field
              prepend-icon="person"
              name="lastName"
              label="lastName"
              type="text"
              v-model="lastName"
            >
            </v-text-field>
              <v-container fluid>
    <v-radio-group v-model="sex" :mandatory="false">
      <v-radio label="male" value="male"></v-radio>
      <v-radio label="famale" value="famle"></v-radio>
    </v-radio-group>
  </v-container>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="register"
          >
            Register
          </v-btn>
        </v-card-actions>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Register',
  data: () => ({
    title: 'Register',
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    sex: '',
    error: null
  }),
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          sex: this.sex
        })
        this.$router.push('/login')
      } catch (error) {
        this.error = error.response.data.error
        console.log(this.error)
      }
    }
  }
}
</script>

<style scoped>
</style>
