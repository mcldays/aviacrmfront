<template>
  <v-app>
    <TableComponent :parent="info"></TableComponent>
  </v-app>
</template>

<script>
import {PersonsController} from "@/controllers/PersonsController";
import {AgentsController} from "@/controllers/AgentsController";
import {Field} from "@/models/Field"
import TableComponent from "@/components/UIComponents/CRUDTableComponent";

let agents = [];

export default {
  name: "Persons",
  components: {TableComponent},
  data(){
    return{
      info: {
        headers: [
          { text: 'Имя', value: 'name' },
          { text: 'Агент', value: 'agent' },
          { text: 'Телефон', value: 'phone' },
          { text: 'Эл. почта', value: 'email' },
          { text: 'Взаимодействия', value: 'actions', sortable: false },
        ],
        fields: [
          new Field("name", "Имя", {rules: [t=>!!t|| "Имя должно быть введено"]}),
          new Field("agent","Агент", {fieldType: "select", fieldParams: {items: this.getAgents, text: "name", value: "id"}}),
          new Field("phone","Телефон"),
          new Field("email","Эл. почта"),
        ],
        instanceNameRod: "ответственного лица",
        instanceNameIm: "ответственное лицо",
        initialize: async (data) =>  {
          agents = (await AgentsController.GetAll()).data;
          data.items = (await PersonsController.GetAll()).data
        },
        toTableView: (data, model) => {
          let agent = agents.find(t=>t.id === model.agent)
          return {
            id: model.id,
            agent: agent ? agent.name : undefined,
            name: model.name,
            phone: model.phone,
            email: model.email
          }
        },
        removeInstance: async (data) => {
          await PersonsController.Remove(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          await PersonsController.Edit(data.editedItem)
        },
        addInstance: async (data, person) => {
          let res = await PersonsController.Add(person);
          return res.data;
        }
      },
    }
  },
  methods:{
    getAgents(){
      return agents;
    }
  },
}
</script>

<style scoped>

</style>