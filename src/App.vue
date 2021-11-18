<template>
  <v-app>
    <router-view class="aut" name="aut"></router-view>
    <GlobalDisplayForm v-if="$store.getters.isLoggedIn">
      <template v-slot:content>
        <router-view class="main"></router-view>
      </template>
    </GlobalDisplayForm>
  </v-app>
</template>

<script lang="ts">

import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import GlobalDisplayForm from './components/GlobalForms/GlobalDisplayForm.vue'
import store from "@/store";
@Component({
  components:{
    GlobalDisplayForm
  }
})

export default class App extends Vue {
  created(){
    Vue.prototype.$http.interceptors.response.use(undefined, (err : any) => {
      return new Promise( (resolve, reject) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          store.dispatch("logout");
          this.$router.push("/aut")
        }
        throw err;
      });
    })
  }

}
</script>
