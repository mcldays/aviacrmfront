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
                  v-bind:value="transModel.carrier"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  :label="'Агент'"
                  :items="agents"
                  item-text="name"
                  item-value="id"
                  :value="transModel.agentId"
                  @change="transModel.agentId = $event"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="ФИО отв"
                  v-model.lazy="transModel.fio"
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
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="Аэропорт назначения"
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
                  :value="transModel.agentsCommission"
                  @change="transModel.agentsCommission = $event"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="FZ price"
                  required
                  :value="transModel.fzPrice"
                  @change="transModel.fzPrice = $event"
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
                                :value="place.seats"
                                @change="place.seats = Number($event)"
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
                                :value="place.weight"
                                @change="place.weight = Number($event)"
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
                                :value="place.width"
                                @change="place.width = Number($event)"
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
                                :value="place.volume"
                                @change="place.volume = Number($event)"
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
                                :value="place.height"
                                @change="place.height = Number($event)"
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
                          @click="close"
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


@Component({
  components:{

  }
})
export default class NewTransportation extends Vue {

  @Prop() editModel : TransportationModel
  public editIndex : number = 0
  private transModel = {} as TransportationModel
  private agentsController = new AgentsController()
  private dialogNewPlace: boolean = false;
  private menu2: boolean = false;
  private loading : boolean = false;
  private menu3: boolean = false;
  private agents :  object[] = []
  private place = {} as PlaceModel
  private editedIndex: number = -1
  private places: PlaceModel[] = []
  private headers: object = [
    {
      text: 'Кол-во мест',
      align: 'start',
      sortable: false,
      value: 'seats',
    },
    {text: 'Вес к.г', value: 'weight'},
    {text: 'Ширина, см', value: 'volume'},
    {text: 'Длинна, см', value: 'width'},
    {text: 'Высота, см', value: 'height'},
    {text: 'Обьем', value: 'volumeTotal'},
    {text: 'Общий вес', value: 'totalWeight'},
    {text: 'Обьемный вес', value: 'totalVolume'},
  ];

  async mounted(){
     await AgentsController.GetAllAgents().then((t: any)=>{
      for (let datum of t.data) {
        this.agents.push({
          name : datum.name,
          id : datum.id
        })
      }
    })
     console.log(this.agents)
  }

  public SaveVolume(){
    let result = this.calculateVolume(this.place)
    this.places.push(result)
    this.close()
  }

  public close() {
    this.dialogNewPlace = !this.dialogNewPlace
    this.printDefaultModel()
  }
  printDefaultModel(){
   this.place = {} as PlaceModel
  }
  calculateVolume(place : PlaceModel){

      place.totalWeight = place.seats * place.weight
    return place
  }
async AddModel(){
    this.transModel.places = this.places
    console.log(this.transModel)
    let controller = new TransportationController()
    this.loading = true
   if(this.editIndex == 0){
     controller.AddNewTransportation(this.transModel).then(this.clean)
   }
   else{
     delete this.transModel.agent
     await controller.UpdateTransportation(this.transModel).then(this.clean)
   }


  }

  closeModal(){
    this.clean()
    this.$emit("closed")
  }

  clean(){
    this.transModel = new TransportationModel()
    this.place = {} as PlaceModel
    this.places = []
    this.loading = false
    this.editIndex = 0
    this.$emit("successAdd")
  }


  @Watch("editModel", {immediate: true, deep: true})
  getDataForEdit(){
    if(Object.keys(this.editModel).length != 0){
      this.editIndex = -1
      this.transModel = this.editModel
    }
  }


}

</script>

<style scoped lang="scss">
.rowAgents{

}
</style>
