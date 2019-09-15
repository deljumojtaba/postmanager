<template>
    <div class="d-flex flex-wrap justify-content-end">
        <div class="mainHome col-12 col-lg-10">
            <b-table
                v-if="users.length"
                striped
                hover
                :items="users"
                :fields="fields"
                class="col-12"
                selectable
                @row-selected="onRowSelected"
            >
                <template slot="[index]" slot-scope="data">{{ data.index + 1 }}</template>
                <template slot="action">
                    <b-button variant="info" class="ml-1" @click="recoverPassword">Recover Password</b-button>
                    <b-button variant="danger" class="ml-1" @click="deleteUser">Delete User</b-button>
                </template>
            </b-table>
            <div v-else>
                <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
                    <p>You're Not Logged In. For a Better Expreience Login.</p>
                    <b-button variant="primary" href="/login">Login</b-button>
                </b-jumbotron>
            </div>
        </div>
    </div>
</template>

<script>
import PostService from '../services/PostService'
import { constants } from 'fs';

export default {
    name: "Allusers",
    async mounted () {
    const result = await PostService.getAllUser()
    if (result) {
      this.$store.dispatch('setLoading', false)
      this.users = result
    }
    },
    data() {
        return {
            users: "",
            fields: [
                "index",
                "firstName",
                "lastName",
                "gender",
                "phoneNumber",
                "email",
                "username",
                "action"
            ],
            selected: []
        };
    },
    methods: {
        onRowSelected(items) {
            this.selected = items;
        },

        recoverPassword() {
            try {
                this.axios
                    .post("http://localhost:3000/admin/recover-password", {
                        userID: this.selected[0]._id
                    })
                    .then(async res => {
                        let response = await this.axios.get(
                            "http://localhost:3000/allUsersInformation"
                        );
                        this.users = response.data.users;
                        alert('Password Recovered.')
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (err) {
                console.log(err);
            }
        },
        deleteUser() {
            try {
                this.axios
                    .post("http://localhost:3000/admin/delete-user", {
                        userID: this.selected[0]._id
                    })
                    .then(async res => {
                        let response = await this.axios.get(
                            "http://localhost:3000/allUsersInformation"
                        );
                        this.users = response.data.users;
                        alert('User Deleted.')
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

<style>
</style>
