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
      </v-card>
      <v-dialog
          v-model="this.modalVision"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
      >
      <NewTransportation/>
      </v-dialog>
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import NewTransportation from "./NewTransportation.vue";
import Finder from './Finder.vue'
import 'vue-resize/dist/vue-resize.css'


@Component({
  components:{
    Finder,
    NewTransportation
  }
})
export default class ListTransportations extends Vue {
  handleResize(){
    console.log("Changed!")
  }
  private finderVision : boolean = false;
  private modalVision : boolean = false;
  private menuTitle : object =[
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' }
  ]
  private headers : object = [
    {
      text: 'Номер а/н',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    { text: 'Дата а/н', value: 'dateNum' },
    { text: 'Дата вылета', value: 'dateRace' },
    { text: 'Рейс', value: 'race' },
    { text: 'Общий вес', value: 'kg' },
    { text: 'Оплачиваемый вес', value: 'payedkg' },
    { text: 'Кол-во мест', value: 'placecount' },
    { text: 'Обьем', value: 'values' },
    { text: 'Направление', value: 'moves' },
    { text: 'Агент', value: 'agent' },
    { text: '', value: 'actions', sortable: false },


  ];
  private lorem : object = [
    {
      name: '12345',
      dateNum:'24.05.2000',
      dateRace: '5.06.2020',
      race: 6.0,
      kg: 24,
      payedkg: 4.0,
      placecount: 6,
      values : 12,
      moves: 22,
      agent : "Василий",
    },
    {
      name: '12345',
      dateNum:'24.05.2000',
      dateRace: '5.06.2020',
      race: 6.0,
      kg: 23,
      payedkg: 4.0,
      placecount: 6,
      values : 12,
      moves: 22,
      agent : "Василий",
    },
    {
      name: '12345',
      dateNum:'24.05.2000',
      dateRace: '5.06.2020',
      race: 6.0,
      kg: 22,
      payedkg: 4.0,
      placecount: 6,
      values : 12,
      moves: 22,
      agent : "Пупа",
    },
    {
      name: '12345',
      dateNum:'24.05.2000',
      dateRace: '5.06.2020',
      race: 6.0,
      kg: 21,
      payedkg: 4.0,
      placecount: 6,
      values : 12,
      moves: 22,
      agent : "Лупа",
    },
    {
      name: '12345',
      dateNum:'24.05.2000',
      dateRace: '5.06.2020',
      race: 6.0,
      kg: 22,
      payedkg: 4.0,
      placecount: 6,
      values : 12,
      moves: 22,
      agent : "Пупа",
    },
    {
      name: '12345',
      dateNum:'24.05.2000',
      dateRace: '5.06.2020',
      race: 6.0,
      kg: 22,
      payedkg: 4.0,
      placecount: 6,
      values : 12,
      moves: 22,
      agent : "Пупа",
    },
    {
      name: '12345',
      dateNum:'24.05.2000',
      dateRace: '5.06.2020',
      race: 6.0,
      kg: 22,
      payedkg: 4.0,
      placecount: 6,
      values : 12,
      moves: 22,
      agent : "Пупа",
    },
    {
      name: '12345',
      dateNum:'24.05.2000',
      dateRace: '5.06.2020',
      race: 6.0,
      kg: 22,
      payedkg: 4.0,
      placecount: 6,
      values : 12,
      moves: 22,
      agent : "Пупа",
    },
    {
      name: '12345',
      dateNum:'24.05.2000',
      dateRace: '5.06.2020',
      race: 6.0,
      kg: 22,
      payedkg: 4.0,
      placecount: 6,
      values : 12,
      moves: 22,
      agent : "Пупа",
    },
  ]
  mounted(){

  }

  findData(){
    this.finderVision = !this.finderVision
  }
  modalVisionAction(){
    this.modalVision = !this.modalVision;
  }
}
</script>
<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;
}
</style>
