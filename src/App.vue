<template>
  <v-app>

  </v-app>
</template>

<script lang="ts">

import HelloWorld from './components/HelloWorld.vue';
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components:{
    HelloWorld
  }
})
export default class App extends Vue {}
</script>
