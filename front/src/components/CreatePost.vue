<template>
  <div>
    <v-layout row>
      <v-flex xs12 class="text-xs-center mt-2">
        <h2 class="title">Here you can create a new post</h2>
      </v-flex>
    </v-layout>
    <v-layout row align-center justify-center>
      <v-flex xs12 md6>
        <panel title="Create a new post">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="title"
              label="title"
              required
            ></v-text-field>
             <v-text-field
              v-model="text"
              label="text"
              multi-line
              required
            ></v-text-field>
            
            <input type="file"
             ref="file"
             @change="pictureSelect"

            >
            <v-btn
              :disabled="!valid"
              @click="submit"
              color="green"
              dark
            >
              submit
            </v-btn>
            <v-btn :to="'/'">Cancel</v-btn>
          </v-form>
        </panel>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import PostService from '../services/PostService'
import FormData from "form-data";
import { constants } from "fs";

export default {
  name: 'CreatePost',
  data: () => ({
    valid: true,
    title: '',
    text: '',
    file: ''
  }),
  methods: {
    pictureSelect() {
            const file = this.$refs.file.files[0];
            this.file = file;
        },
  async submit () {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("title", this.title);
        formData.append("text", this.text);
       
      await PostService.createPost(formData)
          .then(() => this.$router.push('/'))
          .catch((error) => console.log(error))
      }
    }
      
    },
    onPickFile () {
          this.$refs.fileInput.click()
    }
  

}
</script>

<style scoped>

</style>
