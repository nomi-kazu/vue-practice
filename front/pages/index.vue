<template>
  <v-layout justify-center>
    <v-flex xs12 sm12 md12>
      <h2 class="display-1 font-weight-thin mb-4">
        おすすめ
      </h2>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-card
              v-for="n in 5"
              :key="n"
              class="mx-auto my-5"
              max-width="374"
            >
              <v-img
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>

              <v-card-title>イタリアンカフェ</v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increaments
                    readonly
                    size="14"
                  ></v-rating>

                  <div grey--text ml-4>4 (100)</div>
                </v-row>

                <div class="my-4 subtitle-1">
                  $ . イタリアン カフェ
                </div>

                <div>小皿料理、サラダ、サンドイッチなど、絶品メニューとくつろげる空間がおすすめです。</div>
              </v-card-text>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around">
        <v-btn
          class="ma-2"
          color="#fff"
          rounded
          outlined
          :loading="loading"
          :disabled="loading"
          @click="loader = 'loading'"
        >
          再読み込み
            <v-icon dark right>reflesh</v-icon>
        </v-btn>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
    }
  },

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },

  created() {
    console.log("API_KEY:", process.env.API_KEY);
  }
}
</script>
