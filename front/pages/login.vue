<template>
  <v-row>
    <v-col>
      <h2>サインアップ</h2>
      <form>
        <v-text-field v-model="name" :counter="10" label="名前" data-vv-name="name" required></v-text-field>
        <v-text-field v-model="email" :counter="50" label="メールアドレス" data-vv-name="email" required></v-text-field>
        <v-text-field
          v-model="password"
          label="パスワード"
          data-vv-name="password"
          required
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          label="パスワード確認用"
          data-vv-name="passwordConfirm"
          required
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-btn class="mr-4" @click="signup">登録</v-btn>
        <p v-if="error" class="errors">{{ error }}</p>
      </form>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "~/plugins/firebase"
import axios from "~/plugins/axios"

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      show1: false,
      show2: false,
      error: ""
    };
  },

  signup() {
    if (this.password !== this.passwordConfirm) {
      this.error = "※パスワードとパスワード確認が一致していません";
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        const user = {
          name: this.name,
          email: res.user.email,
          uid: res.user.uid
        };
        axios.post("/v1/users",{ user }).then(() => {
          this.$router.push("/");
        });
      })
      .catch(error => {
        this.error = (code => {
          switch (code) {
            case "auth/email-already-in-use":
              return "既にそのメールアドレスは使われています";
            case "auth/wrong-password":
              return "※パスワードが正しくありません";
            case "auth/weak-password":
              return "※パスワードは最低6文字以上にしてください";
            default:
              return "※メールアドレスとパスワードをご確認ください";
          }
        })(error.code);
      });
  }
};
</script>

<style scoped>
  .errors {
    color: red;
    margin-top: 20px;
  }
</style>