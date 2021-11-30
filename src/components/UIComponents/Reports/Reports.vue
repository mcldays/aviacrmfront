<template>
  <v-app>
      <v-tabs style="left: 0;">
        <v-tab @click="component = 'ReportToBank'" style="font-size: 10px">Отчет для банка</v-tab>
        <v-tab @click="component = 'ReportToAk'" style="font-size: 10px">Отчет для а/к</v-tab>
        <v-tab @click="component = 'ReportToStation'" style="font-size: 10px">Отчет по станции</v-tab>
        <v-tab @click="component = 'ReportsToAgent'" style="font-size: 10px">Отчеты для агента</v-tab>
        <v-tab @click="component = 'CheckReports'" style="font-size: 10px">На утверждение агентам</v-tab>
        <v-tab @click="component = 'ReadyReports'" style="font-size: 10px">Утвержденные отчеты агентов</v-tab>
        <v-tab @click="component = 'Expense'" style="font-size: 10px">Счета</v-tab>
        <v-tab @click="component = 'Requisites'" style="font-size: 10px">Реквизиты отчетов</v-tab>
      </v-tabs>
    <keep-alive>
      <component :is="component"/>
    </keep-alive>
  </v-app>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import ReportToBank from "@/components/UIComponents/Reports/ReportToBank/ReportToBank.vue";
import ReportToAk from "@/components/UIComponents/Reports/ReportToAk/ReportToAk.vue";
import ReportToStation from "@/components/UIComponents/Reports/ReportToStation/ReportToStation.vue";
import ReportsToAgent from "@/components/UIComponents/Reports/ReportsToAgent/ReportsToAgent.vue";
import ReadyReports from "@/components/UIComponents/Reports/ReadyReports/ReadyReports.vue";
import CheckReports from "@/components/UIComponents/Reports/ReadyReports/CheckReports.vue";
import Expense from "@/components/UIComponents/Reports/Expenses/Expense.vue";
import Requisites from "@/components/UIComponents/Reports/Requisites.vue";
import ListCarriers from "@/components/UIComponents/Carriers/ListCarriers.vue";

export default {
  components:{
    ListCarriers,
    ReportToBank,
    ReportToAk,
    ReportToStation,
    ReportsToAgent,
    ReadyReports,
    CheckReports,
    Expense,
    Requisites
  },
  data() {
    return {
      component: 'ReportToBank'
    }
  },
}
</script>
<style scoped>

</style>
