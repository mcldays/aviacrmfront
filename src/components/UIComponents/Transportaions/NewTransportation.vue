<template>
  <div>
  <v-app>
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
                  :items="items"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="Агент"
                  :items="items"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="ФИО отв"
                  :items="items"
              ></v-select>
            </v-col>
            </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="Номер А/Н"
                  required
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
                      v-model="date2"
                      label="Дата А/Н"
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
            <v-col>
              <v-text-field
                  label="Email отв"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-select
                  label="Аэропорт вылета"
                  :items="items"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="Аэропорт назначения"
                  :items="items"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                  label="Flight code"
                  required
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
                      v-model="date"
                      label="Дата вылета"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field
                  label="Goods Natures Code"
                  required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="Агентское вознаграждение"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="FZ price"
                  required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="Goods Natures Description"
                  required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-checkbox
                  v-model="ex4"
                  label="Arrival General"
                  color="indigo"
                  value="indigo"
                  hide-details
              ></v-checkbox>
              <v-checkbox
                  v-model="ex4"
                  label="Emergency"
                  color="indigo darken-3"
                  value="indigo"
                  hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-card-title class="pa-2">Места</v-card-title>
          <v-data-table
              :headers="headers"
              :items="places"
              :items-per-page="5"
              class="elevation-1"
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
                                v-model="place.Seats"
                                label="Кол-во мест"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="place.Weight"
                                label="Вес"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="place.Width"
                                label="Длинна"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="place.Volume"
                                label="Ширина"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="place.Height"
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
                      v-model="ex4"
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
                      v-model="ex4"
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
                      v-model="ex4"
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
                      v-model="ex4"
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
                      v-model="ex4"
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
                        v-model="ex4"
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
                        v-model="ex4"
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
                        v-model="ex4"
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
                        v-model="ex4"
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
                        v-model="ex4"
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
            @click="dialog = false"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import {PlaceModel} from "@/components/UIComponents/Transportaions/Models/PlaceModel";
import {TransporationController} from "@/controllers/TransporationController"


@Component({
  components:{

  }
})
export default class NewTransportation extends Vue {
  private dialogNewPlace: boolean = false;
  private menu2: boolean = false;
  private menu3: boolean = false;
  private place: PlaceModel = new PlaceModel(0,0,0,0,0)
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
   this.place =  new PlaceModel(0,0,0,0,0)
  }
  calculateVolume(place : PlaceModel){
      place.TotalWeight = place.Seats * place.Weight
    return place
  }
  AddModel(){
   TransporationController.AddNewTransporation()

  }
}

</script>

<style scoped lang="scss">
.rowAgents{

}
</style>
