<template>
  <v-app>
    <div id="app">
      <v-card>
        <v-card-title>Отчеты для агента
          <v-toolbar dense flat>
            <v-spacer></v-spacer>

            <v-btn icon
                   @click="findData">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>

          <div  v-show="this.finderVision" style="display: flex">
            <v-row class="vrowStyle ma-0 pa-0 ">
              <v-col  >
                <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }"
                  >
                    <v-text-field
                        v-model="date1"
                        label="С"
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
                <v-btn
                    @click="getData()"
                    block
                    elevation="2"
                >
                  Найти
                </v-btn>
              </v-col>
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
                        label="По"
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
                <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date3"
                        label="Дата курса"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="date3"
                      @input="menu3 = false"
                  ></v-date-picker>
                </v-menu>

              </v-col>
              <v-col  >
                <v-select
                    :label="'Агент'"
                    :items="agents"
                    item-text="name"
                    item-value="id"
                    v-model="transModel.agentId"
                ></v-select>
                <v-select
                    :label="'Перевозчик'"
                    :items="carriers"
                    item-text="name"
                    item-value="id"
                    v-model="transModel.carrierId"
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="vrowStyle" style="margin: auto;">
              <v-col>
                <v-btn
                    style="color: azure"
                    block
                    elevation="2"
                    color="green"
                    @click="Approve()"
                >
                  Утвердить отчет
                </v-btn>
                <v-btn
                    style="margin-top: 10px; color: azure"
                    block
                    elevation="2"
                    color="blue"
                    @click="Export()"
                >
                  Экспорт
                </v-btn>
              </v-col>
            </v-row>
          </div>
        <span style="font-weight: bold; margin-left: 5px;">
          Курс валюты: {{rate}}
        </span>

        <v-data-table
            :headers="headers"
            :loading="loading"
            :items="items"
            :items-per-page="5"
            class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import 'vue-resize/dist/vue-resize.css'
import {TransportationModel} from "@/models/transportations/TransportationModel";
import {CarriersController} from "@/controllers/CarriersController";
import {AgentsController} from "@/controllers/AgentsController";
import {TransportationController} from "@/controllers/TransportationController";
import {ConversionRateController} from "@/controllers/ConversionRateController";
import {ReportsExportController} from "@/controllers/ReportsControllers/ReportsExportController";
import {BankReportsModel} from "@/models/reports/BankReportsModel";
import {CarrierModel} from "@/models/transportations/CarrierModel";
import {ReadyReportsController} from "@/controllers/ReportsControllers/ReadyReportsController";
import {CarrierPriceModel} from "@/models/transportations/CarrierPriceModel";

@Component({
  components:{
  }
})
export default class ListCarriers extends Vue {
  handleResize(){
    console.log("Changed!")
  }
  data()
  {
    return{
      date1: '',
      date2: '',
      date3: ''
    }
  }
  private date1 : string
  private date2 : string
  private date3 : string
  private finderVision : boolean = true
  private items : any[] = []
  private controller  = new TransportationController()
  private loading : boolean = false;
  private rate : number = 0
  private transModel = new TransportationModel();
  private respcontroller  = new ReportsExportController()
  private bankModel = new BankReportsModel();
  private Carriers : CarrierModel[] = []
  private Agents : CarrierModel[] = []

  private ReadyReportsController = new ReadyReportsController();

  rules()
  {
    if(this.rule(this.date1))
      return false;
    if(this.rule(this.date2))
      return false;
    if(this.rule(this.date3))
      return false;
    if(this.rule(this.transModel.agentId))
      return false;
    return true
  }
  rule(p : any)
  {
    if(p!=null)
      return false
    else
      alert("Одно или несколько полей не заполнено")
    return true
  }

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
      value: 'position',
    },
    { text: 'Номер а/н', value: 'number' },
    { text: 'ФИО отв.', value: 'fio' },
    { text: 'Дата выпуска а/н', value: 'dateANTable' },
    { text: 'Фактическая дата вылета', value: 'dateOfLeaveTable' },
    { text: 'Аэропорт отправления', value: 'airportFrom.name' },
    { text: 'Аэропорт назначения', value: 'airportTo.name' },
    { text: 'Фактический вес (кг)', value: 'totalWeight' },
    { text: 'Оплачиваемый вес (кг)', value: 'agentPrice.PayedWeight' },
    { text: 'Тариф (USD)', value: 'agentPrice.PriceKg' },
    { text: 'Сумма авиафрахта (USD)', value: 'fzPrice' },
    { text: 'Сборы (USD)', value: 'agentPrice.Fees' },
    { text: 'Итого (USD)', value: 'agentPrice.TotalPrice' },
    { text: 'Итого, руб', value: 'totalRub' },
  ];
  async getData(){
    if(!this.rules())
      return
    await ConversionRateController.GetAll().then((t: any)=>{
      let rt = 0
      let bool = false
      let dd = new Date(this.date3);
      let d3 = new Date(this.date3);
      for (let datum of t.data) {
        let d = new Date(datum.date);
        if(dd<d)
          continue
        if(d<d3&&bool)
          continue
        bool = true
        d3 = d;
        rt = rt = datum.value
      }
      this.rate = rt;
    })
    let model = await this.controller.GetAll().then((t : any)=>{
      this.loading = false
      return t.data
    })
    model = this.processData(model)
    this.parseToTable(model)
  }

  processData(models : TransportationModel[]){
    let newObject : TransportationModel[] = []
    let i = 0;
    let total = new TransportationModel()
    total.agentPrice = new CarrierPriceModel()
    total.agentPrice.Fees = 'Итого:'
    let usd: number = 0
    let rub: number = 0
    this.bankModel.transportationModels=[]
    for (let model of models) {
      if (this.filter(model))
        continue
      i++
      try{
        model.position = i
      }
      catch (Ex){}
      let d = new Date(model.dateOfLeave);
      model.dateOfLeaveTable = d.toLocaleDateString()

      d = new Date(model.dateAN);
      model.dateANTable = d.toLocaleDateString()

      model.totalWeight = 0
      for (let place of model.places) {
        model.totalWeight += place.totalWeight
      }
      try {
        if(model.agentPrice==null)
          model.agentPrice = new CarrierPriceModel()

        if(model.agentPrice.TotalPrice!=null) {
          model.totalRub = this.rate * Number(model.agentPrice.TotalPrice);
          usd += Number(model.agentPrice.TotalPrice)
          rub += Number(model.totalRub)
        }
      }catch (Ex){}
      newObject.push(model);
      this.bankModel.transportationModels.push(model);
    }
    total.agentPrice.TotalPrice = usd.toString()
    total.totalRub = rub
    newObject.push(total);
    console.log(this.bankModel.transportationModels)
    return newObject
  }
  filter(model : any)
  {
    if(this.transModel.carrierId != null)
      if(model.carrierId != this.transModel.carrierId)
        return true
    if(model.agentId != this.transModel.agentId)
      return true
    let d = new Date(model.dateOfLeave);
    let d1 = new Date(this.date1);
    d1.setDate(d1.getDate() - 1);
    let d2 = new Date(this.date2);
    if(!(d >= d1 && d <= d2))
      return true

    return false
  }
  parseToTable(response : TransportationModel[]){
    this.items = response
    console.log(this.items)
  }
  findData(){
    this.finderVision = !this.finderVision;
  }


  private menu1: boolean = false;
  private menu2: boolean = false;
  private menu3: boolean = false;

  private carriers :  object[] = []
  private agents :  object[] = []

  async mounted(){
    this.transModel.carrierId=2
    await CarriersController.GetAll().then((t: any)=>{
      for (let datum of t.data) {
        this.Carriers.push(datum)
        this.carriers.push({
          name : datum.name,
          id : datum.id
        })
      }
    })
    await AgentsController.GetAll().then((t: any)=>{
      for (let datum of t.data) {
        this.Agents.push(datum)
        this.agents.push({
          name : datum.name,
          id : datum.id
        })
      }
    })
    console.log(this.carriers)
  }
  async Approve()
  {
    if(this.transModel.carrierId!=null) {
      let id = this.transModel.carrierId;
      this.bankModel.carrierId = id
    }
    if(this.transModel.agentId!=null) {
      let id = this.transModel.agentId;
      this.bankModel.agentId = id
    }
    this.bankModel.rate = this.rate
    this.bankModel.isApprovedManager = true
    this.bankModel.dateFrom = this.date1;
    this.bankModel.dateTo = this.date2
    this.bankModel.dateMake = new Date().toLocaleDateString()
    let nums: number[] = []
    for (let model of  this.bankModel.transportationModels)
    {
      nums.push(model.id)
    }
    this.bankModel.transportationsId = nums
    console.log(this.bankModel.transportations)

    if(this.bankModel.transportationModels == null)
    {
      alert('Не действительный список перевозок')
      return
    }
    let response = await this.ReadyReportsController.Add(this.bankModel).then((t : any)=>{
      this.loading = false
      return t.data
    })
    if(response != 'Ok')
      alert(response)

  }
  Export()
  {
    if(this.transModel.carrierId!=null) {
      let id = this.transModel.carrierId;
      this.bankModel.carrierId = id
    }
    if(this.transModel.agentId!=null) {
      let id = this.transModel.agentId;
      this.bankModel.agentId = id
    }
    this.bankModel.dateFrom = this.date1;
    this.bankModel.dateTo = this.date2
    this.bankModel.rate = this.rate;
    this.bankModel.dateMake = new Date().toLocaleDateString()
    console.log(this.bankModel)
    this.respcontroller.GetAgent(this.bankModel)
  }
}

</script>

<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;}
</style>
