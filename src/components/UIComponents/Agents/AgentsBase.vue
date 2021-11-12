<template>
  <v-app>
    <v-tabs>
      <v-tab @click="component = 'Agents'">Агенты</v-tab>
      <v-tab @click="component = 'Persons'">Ответственные лица</v-tab>
    </v-tabs>
    <keep-alive>
      <component :is="component"/>
    </keep-alive>
  </v-app>

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