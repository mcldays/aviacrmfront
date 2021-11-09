<template>
  <v-app>
    <div id="app">
      <v-card>
        <v-card-title>Счета
          <v-toolbar dense flat>
            <v-spacer></v-spacer>
            <v-btn icon
                   @click="findData">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <FindExpense
            v-show="this.finderVision"/>

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
import FindExpense from "@/components/UIComponents/Reports/Expenses/FindExpense.vue";

@Component({
  components:{
    FindExpense
  }
})
export default class ListCarriers extends Vue {
  handleResize(){
    console.log("Changed!")
  }
  private finderVision : boolean = false;
  private modalVision : boolean = false;
  private menuTitle : object =[
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' }
  ]
  private headers : object = [
    {
      text: 'Номер счета',
      align: 'start',
      sortable: false,
      value: 'number',
    },
    { text: 'Создан', value: 'created' },
    { text: 'Счет от', value: 'dateFrom' },
    { text: 'Агент', value: 'agent' },
    { text: 'Период', value: 'period' },
    { text: 'Подпись', value: 'sign' },
    { text: 'Валюта', value: 'cur' },
    { text: 'Рассчитанная сумма', value: 'sum' },
    { text: 'Коррекция', value: 'correction' },
    { text: '', value: 'actions', sortable: false },

  ];
  private lorem : object = [
    {
      number: 'FlyDubai',
      created: 'FlyDubai',
      dateFrom: 'FlyDubai',
      agent: 'FlyDubai',
      period: 'FlyDubai',
      sign: 'FlyDubai',
      cur: 'FlyDubai',
      sum: 'FlyDubai',
      correction: 'FlyDubai'
    },
    {
      number: 'FlyDubai',
      created: 'FlyDubai',
      dateFrom: 'FlyDubai',
      agent: 'FlyDubai',
      period: 'FlyDubai',
      sign: 'FlyDubai',
      cur: 'FlyDubai',
      sum: 'FlyDubai',
      correction: 'FlyDubai'
    }
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