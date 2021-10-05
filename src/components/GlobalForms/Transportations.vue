<template>
  <v-app>
    <ListTransportations/>
  </v-app>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import NewTransportation from "../UIComponents/Transportaions/NewTransportation.vue";
import ListTransportations from "@/components/UIComponents/Transportaions/ListTransportations.vue";


@Component({
  components:{
    ListTransportations,
    NewTransportation

  }
})
export default class Transportations extends Vue {

}
</script>
