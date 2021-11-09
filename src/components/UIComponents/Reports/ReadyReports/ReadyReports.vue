<template>
  <v-app>
    <div v-show="this.modalVision" id="app">
      <v-card>
        <v-card-title>Утвержденные отчеты агентов</v-card-title>
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
                @click="editModal(item)"
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
    <div v-show="!this.modalVision" >
      <v-form>

      <v-card >
        <v-card-title>
          <v-icon
            small
            class="mr-2"
            @click="editModal"
        >
          mdi-arrow-left-bold
        </v-icon>Отчеты для агента ООО "КаргоМодуль"</v-card-title>
        <v-card-text>
          <v-container >
            <v-row >
              <v-col>
                <v-card-title class="pa-1">Выставление счета</v-card-title>
                <v-row>
                  <v-text-field
                      label="Номер счета"
                      required
                  ></v-text-field>
                </v-row>
                <v-row>
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
                          label="Счет от "
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
                </v-row>
                <v-row>
                  <v-checkbox
                      label="Подпись"
                      color="indigo"
                      value="indigo"
                      hide-details
                  ></v-checkbox>
                </v-row>
                <v-row>
                  <v-text-field
                      label="Коррекция"
                      required
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                  >
                    Выставить счет
                  </v-btn>
                </v-row>
              </v-col>
              <v-col style="padding-left: 100px">
                <v-row>
                  <v-checkbox
                      label="Подпись"
                      color="indigo"
                      value="indigo"
                      hide-details
                  ></v-checkbox>
                </v-row>
                <v-row>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                  >
                    Экспорт
                  </v-btn>
                </v-row>
                <v-row>
                  <v-btn
                      color="red darken-1"
                      text
                      @click="dialog = false"
                  >
                    Удаление
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      </v-form>
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
  private modalVision : boolean = true;
  private menuTitle : object =[
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' }
  ]
  private headers : object = [
    { text: 'Агент', value: 'agent' },
    { text: 'Перевозчик', value: 'carrier' },
    { text: 'Период', value: 'period' },
    { text: '', value: 'actions', sortable: false },

  ];
  private lorem : object = [
    {
      agent: 'КаргоМодуль',
      carrier: 'н/д',
      period: '16.10.2021 — 31.10.2021'
    },
    {
      agent: 'КаргоМодуль',
      carrier: 'н/д',
      period: '16.10.2021 — 31.10.2021'
    }
  ]
  editModal(){
    this.modalVision = !this.modalVision;
  };
  data() {
    return {
      menu2: false,
    }
  }
}

</script>
<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;}
</style>