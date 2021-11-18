<template>
  <div>
    <TableComponent :parent="info"></TableComponent>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000"
        v-model="passDialog"
    >

      <template v-slot:default="dialog">
        <v-card>
          <v-card-title>
            <span class="text-h5">Установка пароля</span>
          </v-card-title>
          <v-card-text>
              <v-text-field
                  v-model="newPassword"
                  label="Новый пароль"
                  :required="true"
                  :rules="[t=>(t !== null && t.length >= 6) || 'Пароль должен быть длинной от 6 символов']"
              >

              </v-text-field>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
                color="blue darken-1"
                text
                @click="dialog.value = false"
            >Отмена</v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="savePass"
            >
              Сохранить
            </v-btn>

          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import {Field} from "@/models/Field";
import {UsersController} from "@/controllers/UsersController";
import TableComponent from "@/components/UIComponents/CRUDTableComponent";

export default {
  components: {TableComponent},
  name: "Users",
  data () {
    return {
      info: {
        headers: [
          { text: 'Логин', value: 'username' },
          { text: 'ФИО', value: 'fio' },
          { text: 'E-mail', value: 'email' },
          { text: 'Номер телефона', value: 'phone' },
          { text: 'Смена пароля', value: 'addit', sortable: false },
          { text: 'Взаимодействия', value: 'actions', sortable: false },
        ],
        fields: [
          new Field("username", "Логин", {rules: [t=> t !== null || "Логин должен быть введен"]}),
          new Field("fio", "ФИО"),
          new Field("email", "E-mail", {rules: [t=> t !== null || "E-mail должен быть введен"]}),
          new Field("phone", "Номер телефона"),
        ],
        instanceNameRod: "пользователя",
        instanceNameIm: "пользователя",
        initialize: async (data) =>  {
          data.items = (await UsersController.GetAll()).data;
        },
        toTableView: (data, model) => {
          return model
        },
        removeInstance: async (data) => {
          await UsersController.Remove(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          await UsersController.Edit(data.editedItem)
        },
        addInstance: async (data, agent) => {
          let res = await UsersController.Add(agent);
          return res.data;
        },
        additIco: "mdi-lock",
        additCallback: (model) =>{
          this.chosedUserId = model.id
          this.passDialog = true;
        },
      },
      passDialog: false,
      dialog: false,
      newPassword: null,
      chosedUserId: null,
    }
  },
  methods: {
    async savePass(){
      await UsersController.SetPassword({ id: this.chosedUserId, newPassword: this.newPassword});
      this.newPassword = this.chosedUserId = null;
      this.passDialog = false;
    }
  },
}
</script>

<style scoped>

</style>