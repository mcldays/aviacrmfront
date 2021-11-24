<template>
  <v-app>
    <div id="app">
      <v-card>
        <v-card-title>Отчет для авиакомпании
          <v-toolbar dense flat>
            <v-spacer></v-spacer>
            <v-btn icon
                   @click="findData">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <div v-show="this.finderVision" style="display: flex">
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
                <template v-slot:activator="{ on, attrs }">
                  <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                  >
                    <v-text-field
                        :rules="[v => !!v || 'You must agree to continue!']"
                        required
                        v-model="date1"
                        label="С"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    >
                    </v-text-field>
                  </v-form>
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
              <v-select
                  label="Тип даты"
                  item-text="name"
                  item-value="id"
                  :items="datetype"
                  :value="dateType"
                  @change="dateType= $event"
              ></v-select>
            </v-col>
            <v-col  >
              <v-select
                  :label="'Аэропорт отправления'"
                  :items="stations"
                  item-text="name"
                  item-value="id"
                  :value="transModel.airportFromId"
                  @change="transModel.airportFromId= $event"
              >
                ></v-select>
              <v-select
                  :label="'Перевозчик'"
                  :items="carriers"
                  item-text="name"
                  item-value="id"
                  :value="transModel.carrierId"
                  @change="transModel.carrierId= $event"
              >
                ></v-select>
            </v-col>
          </v-row>
          <v-row class="vrowStyle" style="margin: auto;">
            <v-col>
              <v-btn
                  block
                  elevation="2"
                  color="green"
              >
                Утвердить отчет
              </v-btn>
              <v-btn
                  style="margin-top: 10px"
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

        <v-data-table
            :headers="headers"
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
import {CarriersController} from "@/controllers/CarriersController";
import {StationsController} from "@/controllers/StationsController";
import {TransportationModel} from "@/models/transportations/TransportationModel";
import {BankReportsModel} from "@/models/reports/BankReportsModel";
import {TransportationController} from "@/controllers/TransportationController";
import {ReportsExportController} from "@/controllers/ReportsControllers/ReportsExportController";
import {CarrierModel} from "@/models/transportations/CarrierModel";

@Component({
  components:{
  }
})

export default class ListCarriers extends Vue {
  handleResize(){
    console.log("Changed!")
  }
  private finderVision : boolean = true;
  private datetype : object = [
    {
      name : 'Дата а/н',
      id : 0
    },
    {
      name : 'Фактическая дата вылета',
      id : 1
    }
  ]
  private headers : object = [

    { text: 'Номер а/н', value: 'number' },
    { text: 'Фактическая дата вылета', value: 'dateOfLeave' },
    { text: 'Аэропорт отправления', value: 'airportFrom.name' },
    { text: 'Аэропорт назначения', value: 'airportTo.name' },
    { text: 'Кол-во мест', value: 'totalSeats' },
    { text: 'Фактический вес (кг)', value: 'totalWeight' },
    { text: 'Объемный вес (кг)', value: 'totalVolume' },
    { text: 'Тариф (USD)', value: 'carrierPrice.PriceKg' },
    { text: 'Сумма авиафрахта (USD)', value: 'fzPrice' },
    { text: 'Агент. Вознаграждение\n' +
          '(10) x 5%', value: 'agentsCommission' },
    { text: 'Сборы (USD)', value: 'carrierPrice.Fees' },
    { text: 'Итого (USD)', value: 'carrierPrice.TotalPrice' },
  ];
  private items : object = []

  findData(){
    this.finderVision = !this.finderVision;
  }
  rules()
  {
    if(this.rule(this.date1))
      return false;
    if(this.rule(this.date2))
      return false;
    if(this.rule(this.dateType))
      return false;
    if(this.rule(this.transModel.airportFromId))
      return false;
    if(this.rule(this.transModel.carrierId))
      return false;
    return true
  }
  rule(p : any)
  {
    if(p!=null)
      return false
    else
      alert("dd")
    return true
  }
  private menu1: boolean = false;
  private menu2: boolean = false;
  private stations :  object[] = []
  private carriers :  object[] = []
  private Carriers : CarrierModel[] = []

  private dateType : number =-1
  private date1 : string
  private date2 : string
  private controller  = new TransportationController()
  private respcontroller  = new ReportsExportController()
  private loading : boolean = false;
  private transModel = new TransportationModel();
  private valid : boolean = true;
  private bankModel = new BankReportsModel();

  data()
  {
    return{
      date1: '',
      date2: ''
    }
  }
  async mounted(){
    await StationsController.GetAll().then((t: any)=>{
      for (let datum of t.data) {
        this.stations.push({
          name : datum.name,
          id : datum.id
        })
      }
    })
    await CarriersController.GetAll().then((t: any)=>{
      for (let datum of t.data) {
        this.Carriers.push(datum)
        this.carriers.push({
          name : datum.name,
          id : datum.id
        })
      }
    })
  }
  async getData(){
    if(!this.rules())
      return
    loading: false;
    let model = await this.controller.GetAllTransportations().then((t : any)=>{
      this.loading = false
      return t.data
    })
    model = this.processData(model)
    this.parseToTable(model)
  }

  processData(models : TransportationModel[]){
    let newObject : TransportationModel[] = []
    let i = 0;
    for (let model of models) {
      if (this.filter(model))
        continue
      i++;
      try{
        model.position = i
      }
      catch (Ex){}
      model.totalVolume = 0
      model.totalWeight = 0
      model.totalSeats= 0
      for (let place of model.places) {
        model.totalSeats += place.seats
        model.totalVolume += place.volumeWeight
        model.totalWeight += place.totalWeight
      }
      newObject.push(model);
    }
    this.bankModel.transportationModels = newObject;
    return newObject
  }
  filter(model : any)
  {
    if(model.carrierId != this.transModel.carrierId)
      return true
    if(model.airportFromId != this.transModel.airportFromId)
      return true
    let d = new Date(this.dateType==0 ? model.dateAN : model.dateOfLeave);
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
  Export()
  {
    if(this.transModel.carrierId!=null) {
      let id = this.transModel.carrierId;
      this.bankModel.carrier = this.Carriers[id - 1]
    }
    this.bankModel.dateFrom = this.date1;
    this.bankModel.dateTo = this.date2
    this.bankModel.dateMake = new Date().toLocaleDateString()
    this.respcontroller.GetAk(this.bankModel)
  }
}
</script>

<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;}
</style>
