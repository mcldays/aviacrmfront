<template>
  <div>
    <v-data-table
        :headers="parent.headers"
        :items="tableItems"
        :items-per-page="30"
        :footer-props="{
          'items-per-page-options': [10,30,50,100,200]
        }"
        :loading="loading"
        class="elevation-1"

        loading-text="Загрузка... Пожалуйста подождите"
    >

      <template v-slot:footer.prepend>
        <v-toolbar
            flat
        >
          <v-dialog
              v-model="dialog"
              max-width="1000px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  outlined
                  color="primary"
                  class="mb-2 btn"
                  v-bind="attrs"
                  v-on="on"
              >
                {{"Добавить " + parent.instanceNameIm}}
              </v-btn>
              <v-spacer/>
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
                          v-for="field in parent.fields"
                          cols="12"
                          sm="6"
                          md="4"
                      >

                        <v-select
                            v-if="field.fieldType==='select'"
                            :items="field.fieldParams.items()"
                            :item-text="field.fieldParams.text"
                            :item-value="field.fieldParams.value"
                            v-model="editedItem[field.key]"
                            :label="field.name"
                            :rules="field.rules"
                            :required="field.required"
                        ></v-select>
                        <v-checkbox
                            v-else-if="field.fieldType==='checkbox'"
                            v-model="editedItem[field.key]"
                            :label="field.name"
                        ></v-checkbox>
                        <v-textarea
                            v-else-if="field.fieldType==='textarea'"
                            v-model="editedItem[field.key]"
                            :label="field.name"
                        ></v-textarea>
                        <v-menu
                            v-else-if="field.fieldType==='datepicker'"
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
                          ></v-date-picker>
                        </v-menu>
                        <v-text-field
                            v-else-if="field.isVisible"
                            v-model="editedItem[field.key]"
                            :label="field.name"
                            :rules="field.rules"
                            :required="field.required"
                            :type="field.isNumber ? 'number' : ''"
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
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5">{{"Вы уверены, что хотите удалить " + parent.instanceNameIm + "?"}}</v-card-title>
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
      <template v-slot:item.status="{ item }">
        <v-chip
            :color="item.status.color"
            dark
        >
          {{item.status.name}}
        </v-chip>
      </template>
      <template v-slot:item.isActive="{ item }">
        <v-chip
            :color="item.isActive.color"
            dark
        >
          {{item.isActive.name}}
        </v-chip>
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
      <template v-slot:item.actions_remove="{ item }">
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.addit="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="parent.additCallback(item)"
        >
          {{parent.additIco}}
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
  </div>
</template>

<script>
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
  props: ["parent"],
  data(){
    return{
      items:[],
      loading: false,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: null,
      defaultItem: null,
      datepicker_displayed: false,
      is_valid: false,
      parentData: {}
    }
  },
  methods: {
    async initialize () {
      this.loading = true

      this.defaultItem = Object.fromEntries(this.parent.fields.map(t=>[t.key, t.defaultValue]))
      this.editedItem = Object.assign({}, this.defaultItem)

      this.parent.initialize(this.$data).then(()=>this.loading = false);
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

    async deleteItemConfirm () {
      await this.parent.removeInstance(this.$data);
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
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
        let res = await this.parent.editInstance(this.$data);
        if(res === false) return;
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        let person = Object.filter(this.editedItem, t=>(t !== "" && t!== null)); // отфильтровываем пустые поля
        let res = await this.parent.addInstance(this.$data, person);
        if(res === -1) return;
        this.editedItem.id = res;

        this.items.push(this.editedItem)

      }
      this.close()
    },
  },
  computed: {
    formTitle () {
      return (this.editedIndex === -1 ? 'Добавление ' : 'Редактирование ') + this.parent.instanceNameRod
    },
    tableItems(){
      return this.items.map(t=>this.parent.toTableView(this.$data, t))
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
  .bck_lightGreen{
    background-color: lightgreen;
  }
  .btn{
    margin-bottom: 0px !important;
    color: #3e4c83!important;
    padding: 0 35px;
    font-size: 11px;
  }

</style>