<template>
  <v-app>
    <div id="app">
      <v-card>
        <v-card-title>Отчет для банка
          <v-toolbar dense flat>
            <v-spacer></v-spacer>

            <v-btn icon
                   @click="findData">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <FindReport
            v-show="this.finderVision"/>
        <span style="font-weight: bold; margin-left: 5px;">
          Курс валюты:
        </span>

        <v-data-table
            :headers="headers"
            :items="lorem"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
              mdi-download
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import 'vue-resize/dist/vue-resize.css'
import FindReport from "@/components/UIComponents/Reports/ReportToAk/FindReport.vue";

@Component({
  components:{
    FindReport
  }
})
export default class ListCarriers extends Vue {
  handleResize(){
    console.log("Changed!")
  }
  private finderVision : boolean = true;
  private modalVision : boolean = false;
  private menuTitle : object =[
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' }
  ]

  private headers : object = [
    {
      text: '№',
      align: 'start',
      sortable: false,
      value: 'number',
    },
    { text: 'Номер а/н', value: 'numAN' },
    { text: 'Дата выпуска а/н', value: 'dateAN' },
    { text: 'Фактическая дата вылета', value: 'dateFrom' },
    { text: 'Аэропорт отправления', value: 'from' },
    { text: 'Аэропорт назначения', value: 'to' },
    { text: 'Характер груза', value: 'character' },
    { text: 'Кол-во мест', value: 'placeCount' },
    { text: 'Фактический вес (кг)', value: 'factWeight' },
    { text: 'Оплачиваемый вес (кг)', value: 'payWeight' },
    { text: 'Тариф (USD)', value: 'tarif' },
    { text: 'Сумма авиафрахта (USD)', value: 'sumAvia' },
    { text: 'Агент. Вознаграждение\n' +
          '(10) x 5%', value: 'agentPremia' },
    { text: 'Сборы (USD)', value: 'fees' },
    { text: 'Итого (USD)', value: 'totalUsd' },
  ];
  private lorem : object = [
    {
      number: 'FlyDubai',
      numAN: 'FlyDubai',
      dateAN: 'FlyDubai',
      dateFrom: 'FlyDubai',
      from: 'FlyDubai',
      to: 'FlyDubai',
      character: 'FlyDubai',
      placeCount: 'FlyDubai',
      factWeight: 'FlyDubai',
      payWeight: 'FlyDubai',
      tarif: 'FlyDubai',
      sumAvia: 'FlyDubai',
      agentPremia: 'FlyDubai',
      fees: 'FlyDubai',
      totalUsd: 'FlyDubai',
    },
    {
      number: 'FlyDubai',
      numAN: 'FlyDubai',
      dateAN: 'FlyDubai',
      dateFrom: 'FlyDubai',
      from: 'FlyDubai',
      to: 'FlyDubai',
      character: 'FlyDubai',
      placeCount: 'FlyDubai',
      factWeight: 'FlyDubai',
      payWeight: 'FlyDubai',
      tarif: 'FlyDubai',
      sumAvia: 'FlyDubai',
      agentPremia: 'FlyDubai',
      fees: 'FlyDubai',
      totalUsd: 'FlyDubai',
    },
  ]
  findData(){
    this.finderVision = !this.finderVision;
  }
}

</script>

<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;}
</style>