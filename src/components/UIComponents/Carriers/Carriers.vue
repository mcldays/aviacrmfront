<template>
  <ListCarriers/>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import NewCarrier from "@/components/UIComponents/Carriers/NewCarrier.vue";
import ListCarriers from "@/components/UIComponents/Carriers/ListCarriers.vue";


@Component({
  components:{
    ListCarriers,
    NewCarrier
  }
})
export default class Carriers extends Vue {

}
</script>
<style scoped>

</style>