<template>
  <v-app>
    <div v-show="this.modalVision" id="app">
      <v-card>
        <v-card-title>Утвержденные отчеты агентов</v-card-title>
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
                @click="editModal(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div v-show="!this.modalVision" >
      <v-form>

        <v-card >
          <v-card-title>
            <v-icon
                small
                class="mr-2"
                @click="editModal"
            >
              mdi-arrow-left-bold
            </v-icon>Отчеты для агента ООО "КаргоМодуль"</v-card-title>
          <v-card-text>
            <v-container >
              <v-row >
                <v-col>
                  <v-card-title class="pa-1">Выставление счета</v-card-title>
                  <v-row>
                    <v-text-field
                        label="Номер счета"
                        required
                        v-model="expenseModel.number"
                    ></v-text-field>
                  </v-row>
                  <v-row>
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
                            v-model="expenseModel.dateFrom"
                            label="Счет от "
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="expenseModel.dateFrom"
                          @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-row>
                  <v-row>
                    <v-checkbox
                        label="Подпись"
                        color="indigo"
                        :value="true"
                        hide-details
                        v-model="expenseModel.sign"
                    ></v-checkbox>
                  </v-row>
                  <v-row>
                    <v-text-field
                        label="Коррекция"
                        required
                        v-model="expenseModel.correction"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="AddExpense()"
                    >
                      Выставить счет
                    </v-btn>
                  </v-row>
                </v-col>
                <v-col style="padding-left: 100px">
                  <v-row>
                    <v-checkbox
                        label="Подпись"
                        color="indigo"
                        value="indigo"
                        hide-details
                    ></v-checkbox>
                  </v-row>
                  <v-row>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="Export()"
                    >
                      Экспорт
                    </v-btn>
                  </v-row>
                  <v-row>
                    <v-btn
                        color="red darken-1"
                        text
                        @click="Delete()"
                    >
                      Удаление
                    </v-btn>
                  </v-row>
                  <v-row>
                    <v-btn
                        color="yellow"
                        text
                        @click="Approve()"
                    >
                      Утвердить
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <div style="height: 100px"></div>
            <span style="font-weight: bold; margin-left: 5px;">
          Курс валюты: {{rate}}
        </span>
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h5">Вы уверены, что хотите удалить отчет</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-data-table
                :headers="ts_headers"
                :loading="loading"
                :items="ts_items"
                :items-per-page="5"
                class="elevation-1"
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-form>
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import 'vue-resize/dist/vue-resize.css'
import {ReadyReportsController} from "@/controllers/ReportsControllers/ReadyReportsController";
import {StationsController} from "@/controllers/StationsController";
import {CarriersController} from "@/controllers/CarriersController";
import {TransportationModel} from "@/models/transportations/TransportationModel";
import {BankReportsModel} from "@/models/reports/BankReportsModel";
import {CarrierModel} from "@/models/transportations/CarrierModel";
import {ReportsExportController} from "@/controllers/ReportsControllers/ReportsExportController";
import {ConversionRateController} from "@/controllers/ConversionRateController";
import {TransportationController} from "@/controllers/TransportationController";
import {CarrierPriceModel} from "@/models/transportations/CarrierPriceModel";
import {ExpenseModel} from "@/models/reports/ExpenseModel";
import {ExpensesController} from "@/controllers/ReportsControllers/ExpensesController";
@Component({
  components:{
  }
})
export default class ListCarriers extends Vue {
  handleResize(){
    console.log("Changed!")
  }
  private loading : boolean = true;
  private ReadyReportsController = new ReadyReportsController();
  private modalVision : boolean = true;
  private ResponseItems : BankReportsModel[] = []
  private respcontroller  = new ReportsExportController()
  private rate: number = 0
  private ts_headers : object = [
    {
      text: '№',
      align: 'start',
      sortable: false,
      value: 'position',
    },
    { text: 'Номер а/н', value: 'number' },
    { text: 'ФИО отв.', value: 'fio' },
    { text: 'Дата выпуска а/н', value: 'dateAN' },
    { text: 'Фактическая дата вылета', value: 'dateOfLeave' },
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

  private headers : object = [
    { text: 'Агент', value: 'agent.name' },
    { text: 'Перевозчик', value: 'carrier.name' },
    { text: 'Период', value: 'period' },
    { text: '', value: 'actions', sortable: false },

  ];
  private expenseModel = new ExpenseModel()
  private items : object = []
  private ts_items : object = []
  private controller  = new TransportationController()
  private EditedModel = new BankReportsModel()
  private dialogDelete = false
  private deletedItem = null
  editModal(item: BankReportsModel){
    this.EditedModel = item
    this.modalVision = !this.modalVision;
    console.log(this.EditedModel)
    this.getsData()
  };
  data() {
    return {
      menu2: false,
      date2:''
    }
  }
  async deleteItemConfirm () {
    await this.delReq(this.deletedItem)
    this.closeDelete()
  }
  closeDelete () {
    this.deletedItem = null
    this.dialogDelete = false
  }

  Export()
  {
    this.respcontroller.GetAgent(this.EditedModel)
  }
  async Approve()
  {
    if(this.EditedModel.transportationModels==null)
    {
      alert('Не действительный список перевозок')
      return
    }
    console.log(this.EditedModel)
    if(this.EditedModel.id != null)
      await this.ReadyReportsController.Update(this.EditedModel.id)
    this.modalVision = !this.modalVision;
    this.items = []
    await this.getData()
  }
  async Delete()
  {
    if(this.EditedModel.id != null)
      await this.ReadyReportsController.Remove(this.EditedModel.id)
    this.modalVision = !this.modalVision;
    this.items = []
    await this.getData()
  }

  async  deleteItem(item: any)
  {
    this.deletedItem = item
    this.dialogDelete = true
  }

  async delReq(item: any)
  {
    if(item.id != null)
      await this.ReadyReportsController.Remove(item.id)
    this.items = []
    await this.getData()
  }
  async mounted(){
    await this.getData()
  }
  async getData(){
    let model = await this.ReadyReportsController.GetAll().then((t : any)=>{
      this.loading = false
      return t.data
    })

    console.log(model)

    model = this.processData(model)
    this.parseToTable(model)
  }

  parseToTable(response : BankReportsModel[]){
    this.ResponseItems = response
    this.items = this.ResponseItems
    console.log(this.items)
  }
  processData(models : BankReportsModel[]){
    let newObject : BankReportsModel[] = []
    for (let model of models) {
      if(model.isApprovedManager&&!model.isApprovedAgent) {
        model.period = model.dateFrom + ' - ' + model.dateTo
        newObject.push(model);
      }
    }
    return newObject
  }
  async getsData(){
    let model = await this.controller.GetAll().then((t : any)=>{
      this.loading = false
      return t.data
    })
    model = this.tsData(model)
    this.tsToTable(model)
  }

  tsData(models : TransportationModel[]){
    let newObject : TransportationModel[] = []
    let i = 0;
    let idsS = ""
    if(this.EditedModel.transportations!=null)
      idsS = this.EditedModel.transportations
    let ids: string[] = []
    for(let id of idsS.split(';'))
      ids.push(id)
    console.log(ids)
    let total = new TransportationModel()
    total.agentPrice = new CarrierPriceModel()
    total.agentPrice.Fees = 'Итого:'
    let usd: number = 0
    let rub: number = 0
    this.EditedModel.transportationModels = []
    for (let model of models) {
      if(!ids.includes(model.id.toString()))
        continue
      i++
      try{
        model.position = i
      }
      catch (Ex){}
      model.totalWeight = 0
      for (let place of model.places) {
        model.totalWeight += place.totalWeight
      }
      try {
        model.totalRub = this.EditedModel.rate * Number(model.agentPrice.TotalPrice);
      }catch (Ex){}
      if(model.agentPrice != null) {
        usd += Number(model.agentPrice.TotalPrice)
        rub += Number(model.totalRub)
      }
      newObject.push(model);
      this.EditedModel.transportationModels.push(model);
    }
    total.agentPrice.TotalPrice = usd.toString()
    total.totalRub = rub
    newObject.push(total);

    return newObject
  }

  tsToTable(response : TransportationModel[]){
    this.ts_items = response
    console.log(this.items)
  }
  async  AddExpense()
  {
    this.expenseModel.banksReportId = Number(this.EditedModel.id)
    console.log(this.expenseModel)
    let Excontroller = new ExpensesController()
    let response = await Excontroller.Add(this.expenseModel).then((t : any)=>{
      this.loading = false
      return t.data
    })
    if(response != 'Ok')
      alert(response)
  }
}

</script>
<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;}
</style>
