<template>
  <v-app>
    <GlobalDisplayForm>
      <template v-slot:content>
        <router-view></router-view>
      </template>
    </GlobalDisplayForm>
  </v-app>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import GlobalDisplayForm from './components/GlobalForms/GlobalDisplayForm.vue'
@Component({
  components:{
    GlobalDisplayForm
  }
})
export default class App extends Vue {}
</script>
