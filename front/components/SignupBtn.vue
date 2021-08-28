<template>
  <!-- ボタン部分 -->
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-show="!isLoggedIn" class="white--text" text large v-on="on">
        サインアップ
      </v-btn>
    </template>
    <!-- モーダル部分 -->
    <v-card>
      <validation-observer v-slot="{ invalid }">
        <v-toolbar dark>
          <v-toolbar-title>登録フォーム</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <validation-provider
              v-slot="{ errors }"
              name="name"
              rules="required | max:8"
            >
              <v-text-field
                v-model="name"
                label="ユーザーネーム"
                name="name"
                prepend-icon=""
                :error-messages="errors[0]"
                type="text"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required | email"
            >
              <v-text-field
                v-model="email"
                label="メールアドレス"
                name="email"
                prepend-icon=""
                :error-messages="errors[0]"
                type="text"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="password"
              rules="required | min:6"
            >
              <v-text-field
                id="password"
                v-model="password"
                label="パスワード"
                name="password"
                prepend-icon=""
                :error-messages="errors[0]"
                type="password"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="password_confirmation"
              rules="required | min:6 | confirmed:password"
            >
              <v-text-field
                id="password_confirmation"
                v-model="password_confirmation"
                label="パスワード（確認用）"
                name="password_confirmation"
                prepend-icon=""
                :error-messages="errors[0]"
                type="password"
              />
            </validation-provider>
          </v-form>

          <p v-if="error" class="errors">{{ error }}</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="black" class="white--text" :disabled="invalid" @click.prevent="register">
            サインアップ
          </v-btn>
        </v-card-actions>
      </validation-observer>
    </v-card>
  </v-dialog>
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
      password_confirmation: "",
      error: "",
      dialog: false
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },

  methods: {
    register() {
      if (this.password !== this.password_confirmation) {
        this.error = "※パスワードとパスワード（確認用）が一致していません";
      }
      this.$store.commit("setLoading", true);

      firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(res => {
        const user = {
          name: this.name,
          email: res.user.email,
          uid: res.user.uid
        };
        axios.post("/v1/users", { user }).then(() => {
          this.$store.commit("setLoading", false);
          this.$store.commit("login", user);
          this.$store.commit("setNotice", {
            status: true,
            message: "サインアップ成功!"
          });
          setTimeout(() => {
            this.$store.commit("setNotice", {});
          }, 2000); // 2秒後に隠す
        });
      })
      .catch(error => {
        console.log(error);
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
  }
};
</script>

<style scoped>
  .errors {
    color: red;
    margin-top: 20px;
  }
</style>