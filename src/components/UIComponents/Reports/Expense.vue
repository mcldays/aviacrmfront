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
        </v-toolbar>
        <FindExpense
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
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import 'vue-resize/dist/vue-resize.css'
import FindExpense from "@/components/UIComponents/Reports/Expenses/FindExpense.vue";

@Component({
  components:{
    FindExpense
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
  findData(){
    this.finderVision = !this.finderVision;
  }
}

</script>

<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;}
</style>