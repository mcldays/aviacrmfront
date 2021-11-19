<template>
  <div>
    <v-tabs>
      <v-tab style="font-size: 11px" @click="component = 'Agents'">Агенты</v-tab>
      <v-tab style="font-size: 11px" @click="component = 'Persons'">Ответственные лица</v-tab>
    </v-tabs>
    <keep-alive>
      <component :is="component"/>
    </keep-alive>
  </div>

</template>

<script>
import Agents from "@/components/UIComponents/Agents/Agents.vue";
import Persons from "@/components/UIComponents/Agents/Persons.vue";
export default {
  components:{
    Agents,
    Persons
  },
  data() {
    return {
      component: 'Agents'
    }
  },
}

</script>

<style scoped>

</style>