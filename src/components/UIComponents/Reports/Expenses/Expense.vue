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

        <div v-show="this.finderVision" style="display: flex">
          <v-row class="vrowStyle ma-0 pa-0 ">
            <v-col  >
              <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date2"
                      label="С"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date2"
                    @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col  >
              <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date1"
                      label="По"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date1"
                    @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col  >
              <v-select
                  :label="'Агент'"
                  :items="agents"
                  item-text="name"
                  item-value="id"
              ></v-select>
            </v-col>
          </v-row>

          <v-row class="vrowStyle" style="margin: auto;">
            <v-col>
              <v-btn
                  @click="findExpenses"
                  block
                  elevation="2"
              >
                Найти
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="download(item)"
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
import {ExpenseModel} from "@/models/reports/ExpenseModel";
import {CarriersController} from "@/controllers/CarriersController";
import {ExpensesController} from "@/controllers/ReportsControllers/ExpensesController";
import {BankReportsModel} from "@/models/reports/BankReportsModel";
import {AgentsController} from "@/controllers/AgentsController";

@Component({
  components:{
  }
})
export default class ListCarriers extends Vue {
  handleResize(){
    console.log("Changed!")
  }
  private agents :  object[] = []
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
    { text: 'Агент', value: 'banksReport.agent.name' },
    { text: 'Период', value: 'banksReport.period' },
    { text: 'Подпись', value: 'sign' },
    { text: 'Валюта', value: 'cur' },
    { text: 'Рассчитанная сумма', value: 'sum' },
    { text: 'Коррекция', value: 'correction' },
    { text: '', value: 'actions', sortable: false },

  ];

  private loading : boolean = true;
  private expenseModel = new ExpenseModel()
  private items : object = []
  private expensesController = new ExpensesController()
  data() {
    return {
      date2: '',
      date1: '',
      menu2: '',
      menu1: ''
    }
  }
  async mounted() {
    await AgentsController.GetAll().then((t: any)=>{
      for (let datum of t.data) {
        this.agents.push({
          name : datum.name,
          id : datum.id
        })
      }
    })

    let model = await this.expensesController.GetAll().then((t : any)=>{
      this.loading = false
      return t.data
    })
    console.log(model)

    model = this.processData(model)
    this.parseToTable(model)
  }
  parseToTable(response : ExpenseModel[]){
    this.items = response
    console.log(this.items)
  }
  processData(models : ExpenseModel[]){
    let newObject : ExpenseModel[] = []
    for (let model of models) {
      newObject.push(model);
    }
    return newObject
  }

  findData(){
    this.finderVision = !this.finderVision;
  }
  download(item: any){
  }
}

</script>

<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;}
</style>
