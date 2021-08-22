<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <h1>Hello, World!</h1>
      </v-col>
    </v-row>

    <v-card
      class="mx-auto"
      max-width="300"
      title
    >
      <v-list rounded>
        <v-subheader>USERS</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="user in users"
            :key="users.id"
            @click=""
          >
            <v-list-item-content>
              <v-list-item-title v-text="user.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import axios from "~/plugins/axios"

export default {
  data() {
    return {
      users: []
    }
  },

  created() {
    // userをaxiosで取得
    axios.get("/users").then(res => {
      if (res.data) {
        this.users = res.data
      }
    })
  }
}
</script>