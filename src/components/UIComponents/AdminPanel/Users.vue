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
import {RolesController} from "@/controllers/RolesController";

let roles = [
];


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
          { text: 'Роль', value: 'role' },
          { text: 'Смена пароля', value: 'addit1', sortable: false, align: "center" },
          { text: 'Взаимодействия', value: 'actions', sortable: false, align: "center" },
        ],
        fields: [
          new Field("username", "Логин", {rules: [t=> t !== null || "Логин должен быть введен"]}),
          new Field("fio", "ФИО", {rules: [t=> !!t || "ФИО должно быть заполнено"]}),
          new Field("email", "E-mail", {rules: [
              t=> t !== null || "E-mail должен быть введен",
              t=> this.validateEmail(t) || "Email не соответствет требованиям"
            ]}),
          new Field("phone", "Номер телефона"),
          new Field("role", "Роль", {fieldType: "select", fieldParams: {items: this.getRoles, text: "name", value: "id"}}),
        ],
        instanceNameRod: "пользователя",
        instanceNameIm: "пользователя",
        initialize: async (data) =>  {
          roles = (await RolesController.GetAll()).data.map(t=>
          {
            return {
              id: t.id,
              name: t.name
            }
          });
          data.items = (await UsersController.GetAll()).data;
        },
        toTableView: (data, model) => {
          let role = roles.find(t=>t.id === model.role);
          return {
            id: model.id,
            username: model.username,
            fio: model.fio,
            phone: model.phone,
            email: model.email,
            role: role !== undefined ? role.name : "Отсутствует",
          }
        },
        removeInstance: async (data) => {
          await UsersController.Remove(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          await UsersController.Edit(data.editedItem)
        },
        addInstance: async (data, agent, editedITem) => {
          let res = await UsersController.Add(agent);
          return res.data;
        },
        addit1Ico: "mdi-lock",
        addit1Callback: (model) =>{
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
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    getRoles(){
      return roles;
    },
    async created(){

    }
  },
}
</script>

<style scoped>

</style>