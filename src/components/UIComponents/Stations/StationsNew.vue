<template>
  <div>
    <TableComponent :parent="info"></TableComponent>
  </div>
</template>

<script>
import {AgentsController} from "@/controllers/AgentsController"
import {StationsController} from "@/controllers/StationsController"
import {Field} from "@/models/Field"
import TableComponent from "@/components/UIComponents/CRUDTableComponent";

let statuses = [
  {  id: 0, name: "Ok", color: "green"},
  {  id: 1, name: "Warning", color: "yellow"},
  {  id: 2, name: "Deleted", color: "red"},
]

let actives = [
  { id: 0, name: "Да", color: "green"},
  { id: 1, name: "Нет", color: "red"},
]

export default {
  name: "StationsNew",
  components: {TableComponent},
  data () {
    return {
      info: {
        headers: [
          { text: 'Статус', value: 'status' },
          { text: 'Активный', value: 'isActive' },
          { text: 'Название', value: 'name' },
          { text: 'Страна', value: 'country' },
          { text: 'Направление', value: 'direction' },
          { text: 'Описание', value: 'description' },
          { text: 'Взаимодействия', value: 'actions', sortable: false },
        ],
        fields: [
          new Field("name", "Название", {rules: [t=>!!t|| "Название должно быть введено"]}),
          new Field("country", "Страна"),
          new Field("status", "Статус", {fieldType: "select", fieldParams: {items: ()=>statuses, text: "name", value: "id"}, rules: [t=>t !== null|| "Статус должен быть выбран"]}),
          new Field("flightCode", "Default flight code"),
          new Field("isDestination", "Аэропорт назначения", {fieldType: "checkbox"}),
          new Field("isDeparture", "Аэропорт вылета", {fieldType: "checkbox"}),
          new Field("description", "Описание", {fieldType: "textarea"}),
          new Field("isActive", "Активный", {fieldType: "checkbox", defaultValue: true}),
        ],
        instanceNameRod: "станции",
        instanceNameIm: "станцию",
        initialize: async (data) =>  {
          data.items = (await StationsController.GetAll()).data;
        },
        toTableView: (data, model) => {
          return {
            id: model.id,
            name: model.name,
            status: statuses.find(t=>t.id === model.status),
            isActive: model.isActive ? actives[0] : actives[1],
            country: model.country,
            direction: this.getDirection(model),
            description: model.description
          }
        },
        removeInstance: async (data) => {
          await StationsController.Remove(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          await StationsController.Edit(data.editedItem)
        },
        addInstance: async (data, agent) => {
          let res = await StationsController.Add(agent);
          return res.data;
        },


      },
    }
  },
  methods: {
    getDirection(model){
      let direction = "";
      if(model.isDeparture){
        direction += "Departure (";
        direction += model.flightCode ? model.flightCode : "No default flight code";
        direction += ")";
      }
      if(model.isDestination)
        direction += direction ? " Arrival" : "Arrival";
      return direction;
    },
  },
}
</script>

<style scoped>

</style>