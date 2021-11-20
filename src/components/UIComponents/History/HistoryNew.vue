<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        item-key="name"
        :items-per-page="30"
        :footer-props="{
          'items-per-page-options': [10,30,50,100,200]
        }"
        :loading="loading"
        class="elevation-1"
        loading-text="Загрузка... Пожалуйста подождите"
    >
      <template v-slot:top>
        <v-row>
          <v-col class="col"><!--        Datepicker-->
            <v-dialog
                ref="dialog1"
                v-model="modal1"
                :return-value.sync="date1"
                width="290px"
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
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="modal1 = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog1.save(date1)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="col">
            <v-dialog
                ref="dialog2"
                v-model="modal2"
                :return-value.sync="date2"
                width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date2"
                    label="До"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="date2"
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="modal2 = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog2.save(date2)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="col">
            <v-select
                :items="userNames"
                label="Пользователь"
                v-model="chosedUser"
                item-text="fio"
                item-value="id"
            ></v-select>
          </v-col>
          <v-col class="col">
            <v-select
                :items="chapters"
                label="Раздел"
                v-model="chosedChapter"
                item-text="name"
                item-value="id"
            ></v-select>
          </v-col>
          <v-col class="col"
            style="display: flex; justify-content: center;"
          >
            <v-btn
                style="width: 150px;"
                class="ma-2"
                :loading="btnLoading"
                :disabled="btnLoading"
                color="info"
                @click="loadWithFilters"
            >
              Поиск
              <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>mdi-cached</v-icon>
        </span>
              </template>
            </v-btn>
          </v-col>
        </v-row>
      </template>


      <template v-slot:item.changes="{ item }" >
        <div
            class="delete-group"
            v-if="item.type.id === 2">
          <v-chip
              class="custom-v-chip"
              :color="item.type.color"
              dark
          >
            {{item.type.name}}
          </v-chip>
          <span class="blockName" >{{item.blockName}}</span>
        </div>
        <v-expansion-panels
            accordion
            v-else
        >
          <v-expansion-panel

          >
            <v-expansion-panel-header style="padding: 0px 24px;">
              <v-chip
                  class="custom-v-chip"
                  :color="item.type.color"
                  dark
              >
                {{item.type.name}}
              </v-chip>
              <span class="blockName" >{{item.blockName}}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                  :headers="changeHeaders"
                  :items="item.changes"
                  item-key="name"
                  hide-default-footer
                  class="elevation-1"
              >
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

      </template>
    </v-data-table>
  </div>
</template>

<script>
import {HistoryController} from "@/controllers/HistoryController";
import {UsersController} from "@/controllers/UsersController";


export default {
  name: "HistoryNew",
  data () {
    return {
      loading: true,
      items: [],
      headers: [
        { text: "Дата", value: "date" },
        { text: "Пользователь", value: "userFIO" },
        { text: "Изменения", value: "changes" },
      ],
      actionTypes: [
        { id: 0, name: "Добавление", color: "green"},
        { id: 1, name: "Изменение", color: "#5bc0de" },
        { id: 2, name: "Удаление", color: "red" },
      ],
      chapters: [
        { id: -1, name: "Все" },
        { id: 0, name: "Перевозки" },
        { id: 1, name: "Отчеты" },
        { id: 2, name: "География" },
        { id: 3, name: "Перевозчики" },
        { id: 4, name: "Агенты" },
        { id: 5, name: "Курсы конвертации" },
      ],
      changeHeaders:[
        { text: "Поле", value: "fieldName" },
        { text: "Значение", value: "value" },
      ],
      date1: null,
      date2: null,
      modal1: false,
      modal2: false,
      userNames: [],
      chosedUser: -1,
      chosedChapter: -1,
      btnLoading: false

    }
  },
  computed: {

  },
  methods: {
    async initialize(){
      let names = (await UsersController.GetNames()).data;
      names.unshift({id: -1, fio: "Все"});
      this.userNames = names;

      await this.updateItems();

      this.loading = false;
    },
    async loadWithFilters(){
      this.btnLoading = true;
      await this.updateItems();
      this.btnLoading = false;

    },
    async updateItems(){
      let data = (await HistoryController.Get({
        ChapterId: this.chosedChapter,
        UserId: this.chosedUser,
        DateFrom: this.date1,
        DateTo: this.date2
      })).data;
      for (let item of data){
        item.type = this.actionTypes.find(t=>t.id === item.type);
      }
      this.items = data;
    }

  },
  created () {
    this.initialize()
  },
  watch: {
  }
}
</script>

<style scoped>
  .custom-v-chip{
    border-radius: 7px;
    padding: 10px;
    width: 100px;
    flex-grow: inherit;
    cursor: pointer;
  }

  .blockName{
    margin: 12px;
    vertical-align: middle;
  }


  .delete-group{
    border-width: 2px;
    box-sizing: inherit;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    display: flex;
    border-radius: 4px;
    align-items: center;
    padding: 0px 24px;
    background-color: white;
  }
  .col{
    min-width: 150px;
    margin: 0 20px;
  }

</style>

<style lang="scss">
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>