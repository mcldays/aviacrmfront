<template>
  <v-app>
    <TableComponent :parent="info"></TableComponent>
  </v-app>
</template>



<script>
import {AgentsController} from "@/controllers/AgentsController"
import {StationsController} from "@/controllers/StationsController"
import {Field} from "@/models/Field"
import {PersonsController} from "@/controllers/PersonsController";
import TableComponent from "@/components/UIComponents/Agents/CRUDTableComponent";

let stations = [];


export default {
  components: {TableComponent},
  data () {
    return {
      info: {
        headers: [
          { text: 'Название', value: 'name' },
          { text: 'Станция', value: 'station' },
          { text: 'Реквизиты', value: 'requisites' },
          { text: 'Взаимодействия', value: 'actions', sortable: false },
        ],
        fields: [
          new Field("name", "Название", {rules: [t=>!!t|| "Название должно бвыть введено"]}),
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
          new Field("contractDate", "Дата договора", {
            defaultValue: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            fieldType: "datepicker"
          }),
          new Field("fileName", "Имя файла в выгрузке"),
          new Field("station", "Станция", {fieldType: "select", fieldParams: {items: this.getStations, text: "name", value: "id"}}),
        ],
        instanceNameRod: "агента",
        instanceNameIm: "агента",
        initialize: async (data) =>  {
          stations = (await StationsController.GetAllStations()).data;
          data.items = (await AgentsController.GetAllAgents()).data;
          this.processRawAgentsData(data.items);
        },
        toTableView: (data, model) => {
          let station = stations.find(t=>t.id === model.station)
          return {
            id: model.id,
            name: model.name,
            station: station ? station.name : undefined,
            requisites: this.getRequisites(model)
          }
        },
        removeInstance: async (data) => {
          await AgentsController.RemoveAgent(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          await AgentsController.EditAgent(data.editedItem)
        },
        addInstance: async (data, agent) => {
          let res = await AgentsController.AddAgent(agent);
          return res.data;
        }
      },
    }
  },
  methods: {
    getStations(){
      return stations;
    },
    getRequisites(model){
      return [model.director, model.inn, model.kpp].filter(t=>t).join(' ');
    },
    processRawAgentsData: function (models) {
      models.forEach(t => t.contractDate = t.contractDate.substr(0, 10))
    },
  },
}
</script>

<style scoped></style>