<template>
  <v-app>
    <div id="app">
      <v-card>
        <v-toolbar dense flat>
          <v-spacer></v-spacer>

          <v-btn icon
                 @click="findData">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-alert-circle</v-icon>
          </v-btn>

          <v-btn icon @click="addCarrier">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <NewCarrier

            v-show="this.modalVision"/>

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
          v-model="this.finderVision"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
      >
      </v-dialog>
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import 'vue-resize/dist/vue-resize.css'

@Component({
  components:{

  }
})
export default class ListCarriers extends Vue {
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
      text: 'Имя',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    { text: 'Тип перевозчика', value: 'typeCarrier' },
    { text: 'Префикс а/н по умолчанию ', value: 'prefix' },
    { text: '', value: 'actions', sortable: false },


  ];
  private lorem : object = [
    {
      name: 'FlyDubai',
      typeCarrier:'Airline',
      prefix: '141',
    },
    {
      name: 'FlyDubai',
      typeCarrier:'Airline',
      prefix: '141',
    }
  ]
  mounted(){

  }

  addCarrier(){
    this.modalVision = !this.modalVision
  }
  findData(){
    this.finderVision = !this.finderVision;
  }
}

</script>

<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;}
</style>