<template>
  <v-app>
    <div id="app">
      <v-card>
        <div style="display: flex">
          <v-row class="vrowStyle ma-0 pa-0 ">
            <v-col  >
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
                      label="С"
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
              <v-select
                  label="Пользователь"
                  :items="items"
              ></v-select>
            </v-col>
            <v-col  >
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
                      label="По"
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
              <v-select
                  label="Раздел"
                  :items="items"
              ></v-select>
            </v-col>
            <v-col>
              <v-row></v-row>
              <v-row>
                <v-btn
                    @click="findExpenses"
                    block
                    elevation="2"
                >
                  Найти
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <v-data-table
            :headers="headers"
            :items="lorem"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:item.changes="{ item }">
            <v-data-table
                :headers="changeheader"
                :items="changelorem"
            ></v-data-table>
          </template>
        </v-data-table>
      </v-card>
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
export default class History extends Vue {
  name: "History"
  data() {
    return {
      menu1: false,
      menu2: false,
    }
  };
  private changeheader : object = [
    { text: 'Поле', value: 'param' },
    { text: 'Стало', value: 'value' }
  ];
  private changelorem : object = [
    {
      param: 'FlyDubai',
      value: 'user',
    },
  ]
  private headers : object = [
    { text: 'Дата', value: 'date' },
    { text: 'Пользователь', value: 'user' },
    { text: 'Изменения', value: 'changes', style:"width: 20%" }
  ];
  private lorem : object = [
    {
      date: 'FlyDubai',
      user: 'user',
    },
  ]
}
</script>

<style scoped>
  .vrowStyle{
    padding: 0 50px 0 0;
  }
  .v-text-field{
    padding: 5px
  }

  .v-input{
    padding: 5px !important;
  }
</style>
