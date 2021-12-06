<template>
  <div>
    <v-tabs style="left: 0;">
      <v-tab @click="component = 'Users'" style="font-size: 11px">Пользователи</v-tab>
      <v-tab @click="component = 'Roles'" style="font-size: 11px">Роли</v-tab>
      </v-tabs>
    <keep-alive>
      <component :is="component"/>
    </keep-alive>
  </div>
</template>

<script>
import Users from "@/components/UIComponents/AdminPanel/Users.vue";
import Roles from "@/components/UIComponents/AdminPanel/Roles.vue";

export default {
  components: {
    Users,
    Roles
  },
  data() {
    return {
      component: 'Users'
    }
  }
}
</script>

<style scoped>

</style>
