<template>
  <div>
    <TableComponent :parent="info"></TableComponent>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000"
        v-model="personDialog"
    >

      <template v-slot:default="dialog">
        <v-card>
          <v-card-title>
            <span class="text-h5">Редактирование ответственных лиц</span>
          </v-card-title>
          <v-card-text>
            <PersonsComponent ref="innerTable" :chosedPerson="chosedPerson"></PersonsComponent>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
                text
                @click="dialog.value = false"
            >Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>



<script>
import {AgentsController} from "@/controllers/AgentsController"
import {StationsController} from "@/controllers/StationsController"
import {Field} from "@/models/Field"
import TableComponent from "@/components/UIComponents/CRUDTableComponent";
import PersonsComponent from "@/components/UIComponents/Agents/Persons";

let stations = [];


export default {
  components: {TableComponent, PersonsComponent},
  data () {
    return {
      info: {
        headers: [
          { text: 'Название', value: 'name' },
          { text: 'Станция', value: 'station' },
          { text: 'Реквизиты', value: 'requisites' },
          { text: 'Ответственные лмца', value: 'addit1', sortable: false, align: "center" },
          { text: 'Взаимодействия', value: 'actions', sortable: false, align: "center" },
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
            fieldType: "datepicker"
          }),
          new Field("fileName", "Имя файла в выгрузке"),
          new Field("station", "Станция", {fieldType: "select", fieldParams: {items: this.getStations, text: "name", value: "id"}, rules: [t=>!!t|| "Станция должна быть выбрана"]}),
        ],
        instanceNameRod: "агента",
        instanceNameIm: "агента",
        initialize: async (data) =>  {
          stations = (await StationsController.GetAll()).data;
          data.items = (await AgentsController.GetAll()).data;
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
          await AgentsController.Remove(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          await AgentsController.Edit(data.editedItem)
        },
        addInstance: async (data, agent, editedItem) => {
          let res = await AgentsController.Add(agent);
          return res.data;
        },
        addit1Ico: "mdi-account-details",
        addit1Callback: async (model) =>{
          this.chosedPerson = {id: model.id}
          this.personDialog = true;

          if(this.$refs.innerTable)
            await this.$refs.innerTable.$refs.Table.initialize()
            // await this.$refs.innerTable.$data.info.initialize(this.$refs.innerTable.$refs.Table.$data)
        },
      },
      personDialog: false,
      chosedPerson: null,
    }
  },
  methods: {
    getStations(){
      return stations;
    },
    getRequisites(model){
      return [model.director, model.inn, model.kpp].filter(t=>t).join(', ');
    },
    processRawAgentsData: function (models) {
      models.forEach(t => {if(t.contractDate ) {t.contractDate = t.contractDate.substr(0, 10)}})
    },
  },
}
</script>

<style scoped></style>