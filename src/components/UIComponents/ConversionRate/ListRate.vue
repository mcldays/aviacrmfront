<template>
  <v-app>
    <div id="app">
      <v-card>
        <v-toolbar dense flat>
          <v-spacer></v-spacer>

          <v-btn icon @click="openModal">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card
            v-show="modalVision"
        >
          <v-form
              ref="form"
              v-model="is_valid">
            <v-card-title>

              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date1"
                            label="Дата"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="date1"
                          @input="menu1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-text-field
                        label="Значение"
                        required
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
                  @click="addRate"
              >
                Добавить
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>

        <v-data-table
            :headers="headers"
            :items="lorem"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
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
import NewRate from "./NewRate.vue";
import 'vue-resize/dist/vue-resize.css'

@Component({
  components:{
    NewRate
  }
})
export default class ListCarriers extends Vue {
  private finderVision : boolean = false;
  private modalVision : boolean = false;
  data() {
    return {
      menu1: false,
    }
  }
  private headers : object = [
    {
      text: 'Дата',
      align: 'start',
      sortable: false,
      value: 'date',
    },
    { text: 'Значение', value: 'value' },
    { text: '', value: 'actions', sortable: false },


  ];
  private lorem : object = [
    {
      date: 'FlyDuddsbai',
      value:'Airline',
    },
    {
      date: 'FlyDubai',
      value:'Airline',
    }
  ]
  openModal(){
    this.modalVision = !this.modalVision
  }
  addRate(){
    this.modalVision = !this.modalVision
  }
}

</script>


<style scoped>

</style>