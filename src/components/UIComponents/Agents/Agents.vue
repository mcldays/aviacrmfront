<template>
  <v-data-table
      :headers="headers"
      :items="tableItems"
      :items-per-page="30"
      class="elevation-1"

      loading-text="Loading... Please wait"
  >

    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="1000px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              Добавить агента
            </v-btn>
          </template>
          <v-card>
            <v-form
                ref="form"
                v-model="is_valid">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        v-for="field in fields"
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-menu
                          v-if="field.key==='contractDate'"
                          v-model="datepicker_displayed"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="editedItem[field.key]"
                              :label="field.name"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem[field.key]"
                            @input="datepicker_displayed = false"
                        ></v-date-picker>
                      </v-menu>
                      <v-select
                          v-else-if="field.key==='station'"
                          :items="stations"
                          item-text="name"
                          item-value="id"
                          v-model="editedItem[field.key]"
                          :label="field.name"
                      ></v-select>
                      <v-text-field
                          v-else
                          v-model="editedItem[field.key]"
                          :label="field.name"
                          :rules="field.rules"
                          :required="field.required"
                      ></v-text-field>
                    </v-col>



  <!--                  <v-col-->
  <!--                      cols="12"-->
  <!--                      sm="6"-->
  <!--                      md="4"-->
  <!--                  >-->
  <!--                    <v-text-field-->
  <!--                        v-model="editedItem.calories"-->
  <!--                        label="Calories"-->
  <!--                    ></v-text-field>-->
  <!--                  </v-col>-->
  <!--                  <v-col-->
  <!--                      cols="12"-->
  <!--                      sm="6"-->
  <!--                      md="4"-->
  <!--                  >-->
  <!--                    <v-text-field-->
  <!--                        v-model="editedItem.fat"-->
  <!--                        label="Fat (g)"-->
  <!--                    ></v-text-field>-->
  <!--                  </v-col>-->
  <!--                  <v-col-->
  <!--                      cols="12"-->
  <!--                      sm="6"-->
  <!--                      md="4"-->
  <!--                  >-->
  <!--                    <v-text-field-->
  <!--                        v-model="editedItem.carbs"-->
  <!--                        label="Carbs (g)"-->
  <!--                    ></v-text-field>-->
  <!--                  </v-col>-->
  <!--                  <v-col-->
  <!--                      cols="12"-->
  <!--                      sm="6"-->
  <!--                      md="4"-->
  <!--                  >-->
  <!--                    <v-text-field-->
  <!--                        v-model="editedItem.protein"-->
  <!--                        label="Protein (g)"-->
  <!--                    ></v-text-field>-->
  <!--                  </v-col>-->
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
                  Отмена
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Вы уверены, что хотите удалить агента?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
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

    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="initialize"
      >
        Обновить
      </v-btn>
    </template>
  </v-data-table>

</template>



<script>
import {AgentsController} from "@/controllers/AgentsController"
import {StationsController} from "@/controllers/StationsController"
class Field{
  constructor(key, name, defaultValue=null, required=false, rules = []) {
    this.key = key;
    this.name = name;
    this.defaultValue = defaultValue;
    this.required = required;
    this.rules = rules;
  }
}

Object.filter = function( obj, predicate) {
  let result = {}, key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
};



export default {
  data () {
    return {
      headers: [
        { text: 'Название', value: 'name' },
        { text: 'Станция', value: 'station' },
        { text: 'Реквизиты', value: 'requisites' },
        { text: 'Взаимодействия', value: 'actions', sortable: false },
      ],
      items:[],

      loading: false,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: null,
      defaultItem: null,
      fields: [
          new Field("name", "Название", "", true, [t=>!!t|| "Название должно бвыть введено"]),
          new Field("officialName", "Официальное название"),
          new Field("phone", "Телефон"),
          new Field("director", "Директор"),
          new Field("accountant", "Главный бухгалтер"),
          new Field("legalAddress", "Юридический адрес"),
          new Field("factAddress", "Фактический адрес"),
          new Field("postAddress", "Почтовый адрес"),
          new Field("inn", "ИНН"),
          new Field("kpp", "КПП"),
          new Field("bic", "БИК"),
          new Field("ks", "К/с"),
          new Field("rs", "Р/с"),
          new Field("bankName", "Наименование банка"),
          new Field("contractNumber", "Номер договора"),
          new Field("contractDate", "Дата договора",
              (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
          new Field("fileName", "Имя файла в выгрузке"),
          new Field("station", "Станция", null),
      ],
      datepicker_displayed: false,
      stations: [],
      is_valid: false
    }
  },
  methods: {
    initialize () {
      this.defaultItem = Object.fromEntries(this.fields.map(t=>[t.key, t.defaultValue]))
      this.editedItem = Object.assign({}, this.defaultItem)

      this.loading = true

      StationsController.GetAllStations()
          .then(response => {
            this.stations = response.data
          })

      AgentsController.GetAllAgents()
          .then(response =>
          {
            this.items = this.processRawAgentsData(response.data);
            this.loading = false;
          });



    },

    toTableView(model){
      let station = this.stations.find(t=>t.id == model.station)
      return {
        id: model.id,
        name: model.name,
        station: station ? station.name : undefined,
        requisites: this.getRequisites(model)
      }
    },

    getRequisites(model){
      return [model.director, model.inn, model.kpp].filter(t=>t).join(' ');
    },

    processRawAgentsData(models){
      return models.map(t=>
      {
        let obj = Object.fromEntries(Object.entries(t).filter(tt=>(tt[0] !== "upsertedDate" && tt[0] !== "modifiedDate")))
        obj.contractDate = obj.contractDate.substr(0, 10);
        return obj
      })
    },

    editItem (item) {
      this.editedIndex = this.tableItems.findIndex(t=>t.id === item.id)
      this.editedItem = Object.assign({}, this.items.find(t=>t.id === item.id))
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.tableItems.findIndex(t=>t.id === item.id)
      this.editedItem = Object.assign({}, this.items.find(t=>t.id === item.id))
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      AgentsController.RemoveAgent(this.items[this.editedIndex].id)
        .then(_=>{
          this.items.splice(this.editedIndex, 1)
          this.closeDelete()
        })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      this.$refs.form.validate();
      if(!this.is_valid) return;
      if (this.editedIndex > -1) {
        await AgentsController.EditAgent(this.editedItem)
        Object.assign(this.items[this.editedIndex], this.editedItem)

      } else {
        await AgentsController.AddAgent(
            Object.filter(this.editedItem, t=>(t !== "" && t!== null)) // отфильтровываем пустые поля
        )
        this.items.push(this.editedItem)

      }
      this.close()
    },
  },
  computed: {
    formTitle () {
      return (this.editedIndex === -1 ? 'Добавление ' : 'Редактирование ') + "агента"
    },
    tableItems(){
      return this.items.map(t=>this.toTableView(t))
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },
}
</script>

<style scoped></style>