<template>
  <v-layout row align-center justify-center>
    <v-flex xs12 md6>
      <panel title="Edit a post">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="title"
            label="title"
            
          ></v-text-field>
          <v-text-field
            v-model="text"
            label="text"
            multi-line
            
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
            save
          </v-btn>
          <v-btn @click="backToPost">Cancel</v-btn>
        </v-form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
  import PostService from '../services/PostService'
  import FormData from "form-data";
  import { constants } from "fs";
import { connect } from "tls";

  export default {
    name: 'EditPost',
    data: () => ({
      valid: true,
      
        title: '',
        text: '',
        file:''
    
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
            formData.append("id", this.$route.params.id);

         await  PostService.savePost(formData)
            .then(() => this.backToPost())
            .catch(error => console.log(error))
        }
      },
      backToPost () {
        this.$router.push('/post/' + this.$route.params.id)
      }
    },
    async mounted () {
      const result = await PostService.single(this.$route.params.id)
      this.title = result.post.title
      this.text = result.post.text

    }
  }
</script>

<style scoped>

</style>
