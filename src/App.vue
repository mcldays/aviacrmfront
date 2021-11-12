<template>
  <v-app>
    <router-view class="aut" name="aut"></router-view>
    <GlobalDisplayForm>
      <template v-slot:content>
        <router-view class="main"></router-view>
      </template>
    </GlobalDisplayForm>
  </v-app>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import GlobalDisplayForm from './components/GlobalForms/GlobalDisplayForm.vue'
import store from "@/store";
@Component({
  components:{
    GlobalDisplayForm
  }
})

export default class App extends Vue {

}
</script>
