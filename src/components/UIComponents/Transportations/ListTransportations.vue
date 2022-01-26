<template>
  <div>
    <div id="app">
      <v-card>
        <v-toolbar dense flat>
          <v-spacer></v-spacer>
          <v-btn icon @click="findData">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon @click="searchEmergency" v-if="emergencyFilterState">
            <v-icon color="red">mdi-alert-circle</v-icon>
          </v-btn>
          <v-btn icon @click="searchEmergency" v-else>
            <v-icon>mdi-alert-circle</v-icon>
          </v-btn>

          <v-btn icon
          @click="modalVisionAction">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-scroll-y-transition mode="out-in">
        <Finder
        v-if="finderVision"
        @find="find"/>
        </v-scroll-y-transition>
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
        <template v-slot:item.emergency="{ item }">
          <v-simple-checkbox
              v-if="item.emergency"
              v-model="item.emergency"
              input-value="true"
              disabled
              color="red"
          ></v-simple-checkbox>
          <v-simple-checkbox
              v-else
              input-value="false"
              v-model="item.emergency"
              disabled
              color="red"
          ></v-simple-checkbox>

        </template>
      </v-data-table>
      </v-card>
      <v-dialog
          v-bind:value="this.modalVision"
          transition="dialog-bottom-transition"
          max-width="1500px"
          :key="refreshValue"
          @click:outside="refresh"
          scrollable
      >
        <keep-alive>
      <NewTransportation
          :edit-model="editModel"
          v-if="this.modalVision"
          :componentKey="this.newTransKey"
          @successAdd = "refresh"
          @closed="refresh"
      >
      </NewTransportation>
        </keep-alive>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import NewTransportation from "./NewTransportation.vue";
import Finder from './Finder.vue'
import 'vue-resize/dist/vue-resize.css'
import {TransportationController} from "@/controllers/TransportationController";
import {TransportationReadModel} from "@/models/transportations/readmodels/TransportationReadModel";
import {TransportationModel} from "@/models/transportations/TransportationModel";
import {PlaceModel} from "@/models/transportations/PlaceModel";



@Component({
  components:{
    Finder,
    NewTransportation
  },
})
export default class ListTransportations extends Vue {
  private finderVision : boolean = false;
  private dialogDelete : boolean = false
  private modalVision : boolean = false;
  private emergencyFilterState : boolean = false
  private componentKey : number = 0
  private items : any[] = []
  private filterData :any = []
  private newTransKey : number = 0
  private ResponseItems : TransportationModel[] = []
  private loading : boolean = true;
  private controller  = new TransportationController()
  private editModel = {} as TransportationModel
  private readTransModel : TransportationReadModel[] = []
  private refreshValue : number = 0

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
    { text: 'Кол-во мест', value: 'totalSeats' },
    { text: 'Обьем', value: 'totalValue' },
    { text: 'Направление', value: 'fromTo' },
    { text: 'Агент', value: 'agent.name' },
    { text : "Экстренный", value:'emergency'},
    { text: 'Редактирование', value: 'actions', sortable: false },


  ];

  async mounted(){
  await this.getData()
  }

  async getData(){
    let model = await this.controller.GetAll().then((t : any)=>{
      this.loading = false
      return t.data
    })
    model = this.processData(model)
    this.parseToTable(model)
  }

  parseToTable(response : TransportationModel[]){
    this.ResponseItems = response
    this.items = this.ResponseItems
    console.log(this.items)
  }

  findData(){
    this.finderVision = !this.finderVision
  }
  modalVisionAction(){
    this.modalVision = !this.modalVision;
  }
  refresh(){
    this.editModel = new TransportationModel()
    this.refreshValue ++
    this.modalVision = false
    this.newTransKey += 1
    this.items = []
    this.getData()
  }

  deleteItem(item :any){
   let result =  confirm("Вы действительно хотите удалить авианакладную номер " + item.number)
    if(result){
      this.controller.RemoveTransportationFromId(item.id)
      let findItem = this.items.find(t=>t.id == item.id)
      let concatIndex =  this.items.indexOf(findItem)
      this.items.splice(concatIndex, 1)
      console.log(this.items)
    }
  }
  searchEmergency(){
    this.emergencyFilterState = !this.emergencyFilterState
    if(this.emergencyFilterState){
      this.items = this.items.filter((t:TransportationModel) => t.emergency == true)
    }
    else{
      this.items = this.ResponseItems
    }
  }

  editItem(item : TransportationModel){
    this.editModel = item;
    this.modalVision = true
  }

  processData(models : TransportationModel[]){
    let newObject : TransportationModel[] = []
    for (let model of models) {
      let parsedDateLeave = new Date(model.dateOfLeave)
      model.dateOfLeave = this.formatDate(parsedDateLeave)
      let parsedDateAN = new Date(model.dateAN)
      model.dateAN = this.formatDate(parsedDateAN)
      model.totalSeats = 0
      model.totalWeight = 0
      model.totalValue = 0
      model.fromTo = model.airportFrom.name + " - " + model.airportTo.name
      for (let place of model.places) {
        model.totalSeats += place.seats
        model.totalValue+= place.volume
        model.totalWeight+=place.totalWeight
      }
      model.totalWeight = Number(model.totalWeight.toFixed(5))
      model.totalValue= Number(model.totalValue.toFixed(5))
      newObject.push(model);

    }
    return newObject
  }
  find(findData : any){

  }

 formatDate(date : Date){
   let dd : any = date.getDate();
   if (dd < 10){
     dd = '0' + dd;
   }

   let mm : any= date.getMonth() + 1;
   if (mm < 10) mm = '0' + mm;

   let yy : any = date.getFullYear();
   if (yy < 10) yy = '0' + yy;

   return dd + '-' + mm + '-' + yy;
  }

}
</script>
<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
