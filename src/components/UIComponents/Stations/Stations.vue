<template>
  <v-app>
    <v-tabs style="left: 0;">
      <div @click="filterStations">
        <v-btn icon @click="addCarrier">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
      <v-tab @click="getList(0)">Все станции</v-tab>
      <v-tab @click="getList(1)">Станции отправления</v-tab>
      <v-tab @click="getList(2)">Станции назначения</v-tab>
      <v-tab @click="addVision = true">Добавить Станцию</v-tab>
    </v-tabs>
    <v-app v-show="!this.addVision">
      <div>
        <v-row class="vrowStyle ma-0 pa-0 ">
          <v-col  >
            <v-text-field
                hide-details
                label="Страна"
                solo
            ></v-text-field>
          </v-col>
          <v-col  >
            <v-text-field
                hide-details
                label="Имя"
                solo
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <v-data-table
          :headers="headers"
          :items="lorem"
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
    </v-app>
    <v-app v-show="this.addVision">
        <v-card-title>
          <v-icon
              small
              class="mr-2"
              @click="editModal"
          >
            mdi-arrow-left-bold
          </v-icon>Новая станция"</v-card-title>
        <v-card-text>
          <v-container >
            <v-row >
              <v-col>
                <v-row>
                  <v-text-field
                      label="Имя"
                      required
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                      label="Страна"
                      required
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                      label="Описание"
                      required
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                      label="Default flight code"
                      required
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="getList(0)"
                  >
                    Добавить станцию
                  </v-btn>
                </v-row>
              </v-col>
              <v-col style="padding-left: 100px">
                <v-row>
                  <v-select style="padding: 0 5px !important;"
                            label="Состояние станции"
                            :items="items"
                  ></v-select>
                </v-row>
                <v-row>
                  <v-checkbox
                      label="Аэропорт назначения"
                      color="indigo"
                      value="indigo"
                      hide-details
                  ></v-checkbox>
                </v-row>
                <v-row>
                  <v-checkbox
                      label="Аэропорт вылета"
                      color="indigo"
                      value="indigo"
                      hide-details
                  ></v-checkbox>
                </v-row>
                <v-row>
                  <v-checkbox
                      label="Активный"
                      color="indigo"
                      value="indigo"
                      hide-details
                  ></v-checkbox>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
    </v-app>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import 'vue-resize/dist/vue-resize.css'
import NewCarrier from "@/components/UIComponents/Carriers/NewCarrier.vue";

@Component({
  components:{
    NewCarrier
  }
})

export default class Stations extends Vue {
  private addVision : boolean = false;
  name: "Stations";
  data() {
    return {
      menu2: false,
    }
  }
  private headers : object = [
    {
      text: 'Описание',
      align: 'start',
      sortable: false,
      value: 'description',
    },
    { text: 'Имя', value: 'name' },
    { text: 'Страна', value: 'country' },
    { text: 'Статус', value: 'status' },
    { text: 'Активный', value: 'active' },
    { text: 'Направление', value: 'direction' },
    { text: '', value: 'actions', sortable: false },


  ];
  private lorem : object = [
    {
      description: 'FlyDubai',
      name:'Airline',
      country: '141',
      status: 'FlyDubai',
      active:'Airline',
      direction: '141',
    },
    {
      description: 'FlyDubai',
      name:'Airline',
      country: '141',
      status: 'FlyDubai',
      active:'Airline',
      direction: '141',
    }
  ]
  getList(type : any){
    this.addVision = false;
  }
  editModal(){
    this.addVision = false;
  }
  filterStations(){

  }
}
</script>

<style scoped>

</style>