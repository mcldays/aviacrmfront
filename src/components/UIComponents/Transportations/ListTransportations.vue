<template>
  <v-app>
    <div id="app">
      <v-card>
        <v-toolbar dense flat>
          <v-spacer></v-spacer>
          <v-btn icon @click="findData">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-alert-circle</v-icon>
          </v-btn>

          <v-btn icon
          @click="modalVisionAction">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <Finder
        v-show="this.finderVision"/>

      <v-data-table
          v-model="readTransModel"
          :key="componentKey"
          :headers="headers"
          :loading="loading"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
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
      <v-dialog
          v-bind:value="this.modalVision"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
      >
      <NewTransportation
          :edit-model="editModel"
          @successAdd = "refresh"
          @closed="refresh"
      >
      </NewTransportation>
      </v-dialog>
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import NewTransportation from "./NewTransportation.vue";
import Finder from './Finder.vue'
import 'vue-resize/dist/vue-resize.css'
import {TransportationController} from "@/controllers/TransportationController";
import {TransportationReadModel} from "@/models/transportations/readmodels/TransportationReadModel";
import {TransportationModel} from "@/models/transportations/TransportationModel";



@Component({
  components:{
    Finder,
    NewTransportation
  }
})
export default class ListTransportations extends Vue {
  private finderVision : boolean = false;
  private modalVision : boolean = false;
  private componentKey : number = 0
  private items : any[] = []
  private loading : boolean = true;
  private controller  = new TransportationController()
  private editModel = {} as TransportationModel
  private readTransModel : TransportationReadModel[] = []

  private headers : object = [
    {
      text: 'Номер а/н',
      align: 'start',
      sortable: false,
      value: 'number',
    },
    { text: 'Дата а/н', value: 'dateAN' },
    { text: 'Дата вылета', value: 'dateOfLeave' },
    { text: 'Рейс', value: 'flightCode' },
    { text: 'Общий вес', value: 'totalWeight' },
    { text: 'Оплачиваемый вес', value: 'payedkg' },
    { text: 'Кол-во мест', value: 'placecount' },
    { text: 'Обьем', value: 'values' },
    { text: 'Направление', value: 'moves' },
    { text: 'Агент', value: 'agent.name' },
    { text: 'Редактирование', value: 'actions', sortable: false },


  ];

  async mounted(){
  await this.getData()
  }

  async getData(){
    let model = await this.controller.GetAllTransportations().then((t : any)=>{
      this.loading = false
      return t.data
    })
    model = this.processRawAgentsData(model)
    this.parseToTable(model)
  }

  parseToTable(response : TransportationModel[]){
    // let readTransModel : TransportationReadModel[] = []
    // for (let model of response) {
    //   for (let modelElement of model.places) {
    //     readTransModel.push(new TransportationReadModel(
    //         model.id,
    //         model.number,
    //         model.dateAN,
    //         model.dateOfLeave,
    //         model.flightCode,
    //         modelElement.totalWeight,
    //         modelElement.seats
    //     ))
    //   }
    // }
    // this.items = readTransModel
    this.items = response
    console.log(this.items)
  }

  findData(){
    this.finderVision = !this.finderVision
  }
  modalVisionAction(){
    this.modalVision = !this.modalVision;
  }
  refresh(){
    this.modalVision = false
    this.items = []
    this.getData()
  }

  deleteItem(item :any){
    this.controller.RemoveTransportationFromId(item.id)
    let findItem = this.items.find(t=>t.id == item.id)
   let concatIndex =  this.items.indexOf(findItem)
    this.items.splice(concatIndex, 1)
    console.log(this.items)
  }

  editItem(item : TransportationModel){
    this.editModel = item;
    this.modalVision = true
  }

  processRawAgentsData(models : TransportationModel[]){
    let newObject : TransportationModel[] = []
    for (let model of models) {
      model.dateOfLeave = model.dateOfLeave.slice(0,10)
      model.dateAN= model.dateAN.slice(0,10)
      newObject.push(model);
    }
    return newObject
  }



}
</script>
<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;
}
</style>
