<template>
  <v-app>
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
                Добавить ответственное лицо
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

                        <v-select
                            v-if="field.key==='agent'"
                            :items="agents"
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
              <v-card-title class="text-h5">Вы уверены, что хотите удалить ответственное лицо?</v-card-title>
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
  </v-app>
</template>

<script>
import {PersonsController} from "@/controllers/PersonsController";
import {AgentsController} from "@/controllers/AgentsController";
import {Field} from "@/models/Field"

export default {
  name: "Persons",
  data(){
    return{
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'Агент', value: 'agent' },
        { text: 'Телефон', value: 'phone' },
        { text: 'Эл. почта', value: 'email' },
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
        new Field("name", "Имя", "", true, [t=>!!t|| "Имя должно быть введено"]),
        new Field("agent", "Агент"),
        new Field("phone", "Телефон"),
        new Field("email", "Эл. почта"),
      ],
      datepicker_displayed: false,
      agents: [],
      is_valid: false
    }
  },
  methods: {
    initialize () {
      this.defaultItem = Object.fromEntries(this.fields.map(t=>[t.key, t.defaultValue]))
      this.editedItem = Object.assign({}, this.defaultItem)

      this.loading = true

      AgentsController.GetAllAgents()
          .then(response =>
          {
            this.agents = response.data;
          });

      PersonsController.GetAllPersons()
          .then(response => {
            this.items = this.processRawData(response.data);
            this.loading = false;
          })


    },

    toTableView(model){
      let agent = this.agents.find(t=>t.id == model.agent)
      return {
        id: model.id,
        agent: agent ? agent.name : undefined,
        name: model.name,
        phone: model.phone,
        email: model.email
      }
    },



    processRawData(models){
      return models.map(t=>
      {
        let obj = Object.fromEntries(Object.entries(t).filter(tt=>(tt[0] !== "upsertedDate" && tt[0] !== "modifiedDate")))
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
      PersonsController.RemovePerson(this.items[this.editedIndex].id)
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
        await PersonsController.EditPerson(this.editedItem)
        Object.assign(this.items[this.editedIndex], this.editedItem)

      } else {
        await PersonsController.AddPerson(
            Object.filter(this.editedItem, t=>(t !== "" && t!== null)) // отфильтровываем пустые поля
        )
        this.items.push(this.editedItem)

      }
      this.close()
    },
  },
  computed: {
    formTitle () {
      return (this.editedIndex === -1 ? 'Добавление ' : 'Редактирование ') + "ответственного лица"
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

<style scoped>

</style>