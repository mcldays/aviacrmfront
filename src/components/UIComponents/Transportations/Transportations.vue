<template>
  <div>
    <ListTransportations/>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import NewTransportation from "./NewTransportation.vue";
import ListTransportations from "@/components/UIComponents/Transportations/ListTransportations.vue";


@Component({
  components:{
    ListTransportations,
    NewTransportation

  }
})
export default class Transportations extends Vue {

}
</script>
