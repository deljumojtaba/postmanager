<template>
  <v-container v-if="!isLoading">
    <v-layout row justify-center wrap>
      <v-flex xs12 lg9>
        <v-card class="hover-elevation">
          <v-img :src="post.image" height="320px">
          </v-img>
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{post.title}}</h3>
          </v-card-title>
          <v-card-text>
            <div class="pb-2">
              <span>{{ post.created | moment("MMMM Do YYYY")}} by {{post.author}}</span>
            </div>
            <v-divider></v-divider>
            <div class="py-4 text">{{post.text}}</div>
            <v-divider v-if="isAuthor"></v-divider>
          </v-card-text>
          <v-card-actions v-if="isAuthor">
            <v-spacer></v-spacer>
            <v-btn flat color="orange" @click="edit(post._id)">
              <v-icon class="mr-1">edit</v-icon>
              Edit
            </v-btn>
            <v-btn flat color="red" @click="dialog = true">
              <v-icon class="mr-1">delete</v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
       coment: {{comments}}
         <v-text-field class="comment"
              v-model = "comments[0]"
              label="Regular"
              outlined
              readonly
            ></v-text-field>
            <div class="addcomment">
             <v-textarea
            label="Add Comment"
            outlined
            rows="3"
            row-height="25"
            v-model="textComment"
          > 
          </v-textarea>
          <v-btn flat color="green" @click="addComment(post._id,textComment)">
              <v-icon class="mr-1">send</v-icon>
              Send
            </v-btn>
            </div>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="justify-center">
          <div class="subheading">
            Are you sure you want to delete this post?
          </div>
        </v-card-title>
        <v-card-actions class="justify-center mt-4">
          <v-btn flat color="red" @click="remove(post._id)">Yes</v-btn>
          <v-btn flat color="primary" @click.stop="dialog=false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>       
  </v-container>
  <v-container v-else>
    <v-layout row align-center justify-center class="full-height">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-layout>      
  </v-container>
</template>

<script>
import PostService from '../services/PostService'
export default {
  name: 'Post',
  data: () => ({
    post: {},
    dialog: false,
    textComment: "",
    comments: {}
    


  }),
 
  methods: {
    edit (id) {
      this.$router.push('/edit/' + id)
    },
    async remove (id) {
      PostService.deletePost(id)
        .then(() => this.$router.push('/'))
        .catch(error => console.log(error))
    },
    showDialog () {

    },
    async addComment (id,textComment) {
      PostService.addComment(id,textComment)
        .then(() => this.textComment= "")

      
    }
  //    async mounted() {
  //     const postId = this.post.id
  //     const responseComments = await PostService.getComments(postId)
  //      this.comments = responseComments
  // }

  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    isAuthor () {
      const username = JSON.parse(localStorage.getItem('user')).username
      return this.post.author === username
    }
  },
  async created () {
    this.$store.dispatch('setLoading', true)
    const result = await PostService.single(this.$route.params.id)
    if (result) {
      this.$store.dispatch('setLoading', false)
      this.post = result.post
      this.comments = result.comments
    }
  }

}
</script>

<style scoped>
  .full-height {
    height: 100vh;
  }

  .text {
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0 , .7);
  }
  .comment {
    border-radius: 10px;
    background-color: whitesmoke ;
  }
  .addcomment {
    border: 1px solid black ;
    border-radius: 10px;
    display: flex;
    background-color: whitesmoke;
  }
</style>
