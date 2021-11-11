<template>
  <ListRate></ListRate>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import ListRate from "@/components/UIComponents/ConversionRate/ListRate.vue";


@Component({
  components:{
    ListRate
  }
})
export default class ConversionRate extends Vue {

}
</script>
