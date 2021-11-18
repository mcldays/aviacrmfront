<template>
  <div>
  <v-app>
    <v-form>
    <v-card>
      <v-toolbar
          flat
          dark
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Новая перевозка</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              @click="this.AddModel"
          >
            Сохранить
          </v-btn>
        </v-toolbar-items>
        <v-menu
            bottom
            right
            offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-card-title class="pa-1">Общая информация</v-card-title>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-select
                  label="Перевозчик"
                  :items="carriers"
                  item-text="name"
                  item-value="id"
                  v-model="transModel.carrierId"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  :label="'Агент'"
                  :items="agents"
                  item-text="name"
                  item-value="id"
                  v-model="transModel.agentId"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="ФИО отв"
                  v-model.lazy="transModel.fio"
                  :items="persons"
                  item-text="name"
                  item-value="name"
              ></v-select>
            </v-col>
            </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="Номер А/Н"
                  required
                  :value="transModel.number"
                  @change="transModel.number = $event"
              ></v-text-field>
            </v-col>
            <v-col>
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
                      label="Дата А/Н"
                      :value="transModel.dateAN"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    @input="menu2 = false"
                    :value="transModel.dateAN"
                    @change="transModel.dateAN = $event"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field
                  label="Email отв"
                  required
                  :value="transModel.email"
                  @change="transModel.email = $event"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-select
                  label="Аэропорт вылета"
                  v-model.lazy="transModel.airportFromId"
                  :items="airportFrom"
                  item-text="name"
                  item-value="id"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="Аэропорт назначения"
                  :items="airportTo"
                  item-text="name"
                  item-value="id"
                  v-model.lazy="transModel.airportToId"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                  label="Flight code"
                  required
                  :value="transModel.flightCode"
                  @change="transModel.flightCode = $event"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
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
                      :value="transModel.dateOfLeave"
                      label="Дата вылета"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    @input="menu3 = false"
                    :value="transModel.dateOfLeave"
                    @change="transModel.dateOfLeave = $event"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field
                  label="Goods Natures Code"
                  required
                  :value="transModel.goodsNatureCode"
                  @change="transModel.goodsNatureCode = $event"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="Агентское вознаграждение"
                  required
                  v-model.number="transModel.agentsCommission"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="FZ price"
                  required
                  v-model.number="transModel.fzPrice"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="Goods Natures Description"
                  required
                  :value="transModel.goodsNatureDescription"
                  @change="transModel.goodsNatureDescription = $event"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-checkbox
                  label="Arrival General"
                  color="indigo"
                  value="indigo"
                  :value="transModel.arrivalGeneral"
                  @change="transModel.arrivalGeneral = $event"
                  hide-details
              ></v-checkbox>
              <v-checkbox
                  label="Emergency"
                  color="indigo darken-3"
                  value="indigo"
                  hide-details
                  :value="transModel.emergency"
                  @change="transModel.emergency= $event"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-card-title class="pa-2">Места</v-card-title>
          <v-data-table
              :headers="headers"
              class="elevation-1"
              :items="places"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-toolbar-title>Добавить место</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                  icon
                  @click="dialogNewPlace=true"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
                <v-dialog
                    v-model="dialogNewPlace"
                    max-width="500px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Добавить место</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                type="number"
                                v-model.number="place.seats"
                                label="Кол-во мест"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                type="number"
                                v-model.number="place.weight"
                                label="Вес"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                type="number"
                                v-model.number="place.length"
                                label="Длинна"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                type="number"
                                v-model.number="place.width"
                                label="Ширина"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                type="number"
                                v-model.number="place.height"
                                label="Высота"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="blue darken-1"
                          text
                          @click="closeSeats"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                          color="blue darken-1"
                          text
                          @click="SaveVolume"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template
                v-slot:body.append
            >
              <tr>
                <td>{{totalCount.totalSeats}}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{totalCount.totalWeight}}</td>
                <td></td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
        <div style="display: flex">
        <v-container>
          <v-card-title class="pa-1">Перевозчик</v-card-title>
          <div style="display: flex;">
          <v-row>
            <v-col>
              <v-text-field
                  hide-details
                  label="Оплачиваемый вес"
              >
                <template v-slot:append-outer>
                  <v-checkbox
                      class="pa-0 ma-0"
                      label="Авто"
                      color="primary"
                      value="red"
                      hide-details
                  ></v-checkbox>
                </template>
              </v-text-field>
              <v-text-field
                  hide-details
                  label="Способ расчета"
              >
                <template v-slot:append-outer>
                  <v-checkbox
                      class="pa-0 ma-0"
                      label="Авто"
                      color="primary"
                      value="red"
                      hide-details
                  ></v-checkbox>
                </template>
              </v-text-field>
              <v-text-field
                  hide-details
                  label="Цена за кг"
              >
                <template v-slot:append-outer>
                  <v-checkbox
                      class="pa-0 ma-0"
                      label="Авто"
                      color="primary"
                      value="red"
                      hide-details
                  ></v-checkbox>
                </template>
              </v-text-field>
              <v-text-field
                  hide-details
                  label="Стоимость"
              >
                <template v-slot:append-outer>
                  <v-checkbox
                      class="pa-0 ma-0"
                      label="Авто"
                      color="primary"
                      value="red"
                      hide-details
                  ></v-checkbox>
                </template>
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  hide-details
                  label="MZC"
              >
                <template v-slot:append-outer>
                  <v-checkbox
                      class="pa-0 ma-0"
                      label="Авто"
                      color="primary"
                      value="red"
                      hide-details
                  ></v-checkbox>
                </template>
              </v-text-field>
              <v-text-field
                  hide-details
                  label="Сумма сборов"
              >
              </v-text-field>
              <v-text-field
                  hide-details
                  label="Итого"
              >
              </v-text-field>
            </v-col>
          </v-row>
          </div>
        </v-container>
        <v-container>
          <v-card-title class="pa-1">Агент</v-card-title>
          <div style="display: flex;">
            <v-row>
              <v-col>
                <v-text-field
                    hide-details
                    label="Оплачиваемый вес"
                >
                  <template v-slot:append-outer>
                    <v-checkbox
                        class="pa-0 ma-0"
                        label="Авто"
                        color="primary"
                        value="red"
                        hide-details
                    ></v-checkbox>
                  </template>
                </v-text-field>
                <v-text-field
                    hide-details
                    label="Способ расчета"
                >
                  <template v-slot:append-outer>
                    <v-checkbox
                        class="pa-0 ma-0"
                        label="Авто"
                        color="primary"
                        value="red"
                        hide-details
                    ></v-checkbox>
                  </template>
                </v-text-field>
                <v-text-field
                    hide-details
                    label="Цена за кг"
                >
                  <template v-slot:append-outer>
                    <v-checkbox
                        class="pa-0 ma-0"
                        label="Авто"
                        color="primary"
                        value="red"
                        hide-details
                    ></v-checkbox>
                  </template>
                </v-text-field>
                <v-text-field
                    hide-details
                    label="Стоимость"
                >
                  <template v-slot:append-outer>
                    <v-checkbox
                        class="pa-0 ma-0"
                        label="Авто"
                        color="primary"
                        value="red"
                        hide-details
                    ></v-checkbox>
                  </template>
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                    hide-details
                    label="MZC"
                >
                  <template v-slot:append-outer>
                    <v-checkbox
                        class="pa-0 ma-0"
                        label="Авто"
                        color="primary"
                        value="red"
                        hide-details
                    ></v-checkbox>
                  </template>
                </v-text-field>
                <v-text-field
                    hide-details
                    label="Сумма сборов"
                ></v-text-field>
                <v-text-field
                    hide-details
                    label="Итого"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-container>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="closeModal"
        >
          Закрыть
        </v-btn>
        <v-btn
            :loading="this.loading"
            color="blue darken-1"
            text
            @click="this.AddModel"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-form>
  </v-app>
  </div>
</template>

<script lang="ts">

import {Component, Model, Prop, Vue, Watch} from 'vue-property-decorator'
import {PlaceModel} from "@/models/transportations/PlaceModel";
import {TransportationController} from "@/controllers/TransportationController"
import {TransportationModel} from "@/models/transportations/TransportationModel";
import {AgentsController} from "@/controllers/AgentsController";
import {AgentModel} from "@/models/transportations/AgentModel";
import {CarriersController} from "@/controllers/CarriersController";
import {PersonsController} from "@/controllers/PersonsController";
import {StationsController} from "@/controllers/StationsController";


@Component({
  components:{

  }
})
export default class NewTransportation extends Vue {

  @Prop() editModel : TransportationModel
  @Prop() componentKey : number
  public editIndex : number = 0
  private transModel = {} as TransportationModel
  private dialogNewPlace: boolean = false;
  private menu2: boolean = false;
  private loading : boolean = false;
  private menu3: boolean = false;
  private totalCount : any = {
    totalSeats : 0,
    totalWeight : 0
  }
  private agents :  object[] = []
  private carriers : object[] = []
  private persons : object[]= []
  private airportFrom : object[] = []
  private airportTo : object[] = []
  private place = {} as PlaceModel
  private places: PlaceModel[] = []
  private headers: object = [
    {
      text: 'Кол-во мест',
      align: 'start',
      sortable: false,
      value: 'seats',
    },
    {text: 'Вес к.г', value: 'weight'},
    {text: 'Ширина, см', value: 'width'},
    {text: 'Длинна, см', value: 'length'},
    {text: 'Высота, см', value: 'height'},
    {text: 'Обьем', value: 'volume'},
    {text: 'Общий вес', value: 'totalWeight'},
    {text: 'Обьемный вес', value: 'volumeWeight'},
  ];

  async mounted(){
    await AgentsController.GetAll().then((t: any)=>{
      this.agents = this.prepareDataForSelect(t.data)
    })
    await CarriersController.GetAll().then((t:any)=>{
      this.carriers = this.prepareDataForSelect(t.data)
    })
    await PersonsController.GetAll().then((t:any)=>{
      this.persons = this.prepareDataForSelect(t.data)
    })
    await StationsController.GetAll().then((t:any)=>{
      let models = this.prepareDataFromAirports(t.data)
      this.airportFrom = models[0]
      this.airportTo = models[1]
    })
  }

  prepareDataFromAirports(model : any[]) : [object[], object[]]{
    let airportsTo : any[] = []
    let airportsFrom : any[] = []
    for (let modElement of model) {
      if(modElement.isDeparture){
          airportsFrom.push({
            name: modElement.name,
            id : modElement.id
          })
      }
      else{
        airportsTo.push({
          name: modElement.name,
          id : modElement.id
        })
      }
    }
    return [airportsFrom, airportsTo]

  }


  prepareDataForSelect(model:any[]){
    let pushModel : any[] = []
    for (let modelElement of model) {
      pushModel.push({
        name: modelElement.name,
        id : modelElement.id
      })
    }
    return pushModel
  }

  public SaveVolume(){
    let result = this.calculateVolume(this.place)
    this.places.push(result)
    this.totalCount.totalSeats += Number(this.place.seats)
    this.totalCount.totalWeight += this.place.totalWeight
    this.closeSeats()
  }



  public closeSeats() {
    this.dialogNewPlace = !this.dialogNewPlace
    this.place = new PlaceModel()
  }


  calculateVolume(place : PlaceModel){
      place.totalWeight = place.seats * place.weight
      place.volume = ((place.length * 0.01) * (place.height* 0.01)
          * (place.weight * 0.01))
      place.volumeWeight = (place.volume) / 6000
       return place
  }
async AddModel(){
    let controller = new TransportationController()
    this.loading = true
   if(this.editIndex == 0){
     this.transModel.places = this.places
     controller.AddNewTransportation(this.transModel).then(this.clean)
   }
   else{
     this.cleanJson()
     await controller.UpdateTransportation(this.transModel).then(this.clean)
   }
  }
  cleanJson(){
    delete this.transModel.agent
    delete this.transModel.fromTo
    delete this.transModel.carrier
    delete this.transModel.totalWeight
    delete this.transModel.totalSeats
    delete this.transModel.airportFrom
    delete this.transModel.airportTo
  }

  closeModal(){
    this.clean()
    this.$emit("closed")
  }

  clean(){
    this.transModel = new TransportationModel()
    this.places = []
    this.loading = false
    this.editIndex = 0
    this.totalCount.totalSeats = 0
    this.totalCount.totalWeight = 0
    this.$emit("successAdd")
  }


  @Watch("editModel", {immediate: true})
  getDataForEdit(){
    if(Object.keys(this.editModel).length != 0){
      this.editIndex = -1
      this.transModel = this.editModel
      this.places = this.editModel.places
      for (let place of this.places) {
        this.totalCount.totalSeats +=place.seats
        this.totalCount.totalWeight += place.totalWeight
      }
    }
  }


}

</script>

<style scoped lang="scss">
.rowAgents{

}
</style>
