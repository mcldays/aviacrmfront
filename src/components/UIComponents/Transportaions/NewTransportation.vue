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
              @click="dialog = false"
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
                  v-bind:value="transModel.Carrier"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="Агент"
                  v-model.lazy="transModel.Agent"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="ФИО отв"
                  v-model.lazy="transModel.Fio"
              ></v-select>
            </v-col>
            </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="Номер А/Н"
                  required
                  :value="transModel.Number"
                  @change="transModel.Number = $event"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-menu
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      label="Дата А/Н"
                      :value="transModel.DateAN"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    @input="menu2 = false"
                    :value="transModel.DateAN"
                    @change="transModel.DateAN = $event"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field
                  label="Email отв"
                  required
                  :value="transModel.Email"
                  @change="transModel.Email = $event"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-select
                  label="Аэропорт вылета"
                  v-model.lazy="transModel.AirportFromId"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="Аэропорт назначения"
                  v-model.lazy="transModel.AirportToId"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                  label="Flight code"
                  required
                  :value="transModel.FlightCode"
                  @change="transModel.FlightCode = $event"
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
                      :value="transModel.DateOfLeave"
                      label="Дата вылета"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    @input="menu3 = false"
                    :value="transModel.DateOfLeave"
                    @change="transModel.DateOfLeave = $event"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field
                  label="Goods Natures Code"
                  required
                  :value="transModel.GoodsNatureCode"
                  @change="transModel.GoodsNatureCode = $event"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="Агентское вознаграждение"
                  required
                  :value="transModel.AgentsCommission"
                  @change="transModel.AgentsCommission = $event"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="FZ price"
                  required
                  :value="transModel.FZPrice"
                  @change="transModel.FZPrice = $event"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="Goods Natures Description"
                  required
                  :value="transModel.GoodsNatureDescription"
                  @change="transModel.GoodsNatureDescription = $event"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-checkbox
                  label="Arrival General"
                  color="indigo"
                  value="indigo"
                  :value="transModel.ArrivalGeneral"
                  @change="transModel.ArrivalGeneral = $event"
                  hide-details
              ></v-checkbox>
              <v-checkbox
                  label="Emergency"
                  color="indigo darken-3"
                  value="indigo"
                  hide-details
                  :value="transModel.Emergency"
                  @change="transModel.Emergency= $event"
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
                                :value="place.Seats"
                                @change="place.Seats = Number($event)"
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
                                :value="place.Weight"
                                @change="place.Weight = Number($event)"
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
                                :value="place.Width"
                                @change="place.Width = Number($event)"
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
                                :value="place.Volume"
                                @change="place.Volume = Number($event)"
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
                                :value="place.Height"
                                @change="place.Height = Number($event)"
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
            @click="dialog = false"
        >
          Закрыть
        </v-btn>
        <v-btn
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

import {Component, Model, Prop, Vue} from 'vue-property-decorator'
import {PlaceModel} from "@/models/transporations/PlaceModel";
import {TransportationController} from "@/controllers/TransportationController"
import NewTransportationModel from "@/models/transporations/NewTransportationModel";


@Component({
  components:{

  }
})
export default class NewTransportation extends Vue {
  private transModel = {} as NewTransportationModel
  private dialogNewPlace: boolean = false;
  private menu2: boolean = false;
  private menu3: boolean = false;
  private place= {} as PlaceModel
  private editedIndex: number = -1
  private places: PlaceModel[] = []
  private headers: object = [
    {
      text: 'Кол-во мест',
      align: 'start',
      sortable: false,
      value: 'Seats',
    },
    {text: 'Вес к.г', value: 'Weight'},
    {text: 'Ширина, см', value: 'Volume'},
    {text: 'Длинна, см', value: 'Width'},
    {text: 'Высота, см', value: 'Height'},
    {text: 'Обьем', value: 'VolumeTotal'},
    {text: 'Общий вес', value: 'TotalWeight'},
    {text: 'Обьемный вес', value: 'TotalVolume'},
  ];


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
      place.TotalWeight = place.Seats * place.Weight
    return place
  }
 async AddModel(){
    this.transModel.Places = this.places
   console.log(this.transModel)
    let controller = new TransportationController()
    await controller.AddNewTransportation(this.transModel)
  }
}

</script>

<style scoped lang="scss">
.rowAgents{

}
</style>
