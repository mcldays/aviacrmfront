<template>
  <div>
    <TableComponent :parent="info"></TableComponent>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000"
        v-model="feesDialog"
    >

      <template v-slot:default="dialog">
        <v-card>
          <v-card-title>
            <span class="text-h5">Редактирование сборов</span>
          </v-card-title>
          <v-card-text>
            <TableComponent ref="innerTable" :parent="feesInfo"></TableComponent>
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
import TableComponent from "@/components/UIComponents/CRUDTableComponent";
import {Field} from "@/models/Field";
import {CarriersController} from "@/controllers/CarriersController";
import {FeesController} from "@/controllers/FeesController";

let types = [
  {id: 0, name: "Airline"}
]

let methods = [
  {id: 0, name: "Per shipment"},
  {id: 1, name: "Per kg"},
]

export default {
  name: "CarriersNew",
  components: {TableComponent},
  data () {
    return {
      info: {
        headers: [
          { text: 'Название', value: 'name' },
          { text: 'Название на русском', value: 'rusName' },
          { text: 'Тип перевозчика', value: 'type' },
          { text: 'Префикс а/н по умолчанию', value: 'prefix' },
          { text: 'Сборы', value: 'addit1' },
          { text: 'Взаимодействия', value: 'actions', sortable: false },
        ],
        fields: [
          new Field("name", "Название", {rules: [t=>!!t|| "Название должно быть введено"]}),
          new Field("rusName", "Название на русском", {rules: [t=>!!t|| "Название должно быть введено"]}),
          new Field("type", "Тип перевозчика", {defaultValue: 0, fieldType: "select", fieldParams: {items: ()=>types, text: "name", value: "id"}}),
          new Field("prefix", "Префикс а/н по умолчанию"),
        ],
        instanceNameRod: "перевозчика",
        instanceNameIm: "перевозчика",
        initialize: async (data) =>  {
          data.items = (await CarriersController.GetAll()).data;
        },
        toTableView: (data, model) => {
          return {
            id: model.id,
            name: model.name,
            rusName: model.rusName,
            type: types.find(t=>t.id === model.type).name,
            prefix: model.prefix,
          }
        },
        removeInstance: async (data) => {
          await CarriersController.Remove(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          await CarriersController.Edit(data.editedItem)
        },
        addInstance: async (data, agent, editedItem) => {
          let res = await CarriersController.Add(agent);
          return res.data;
        },
        addit1Callback: async (item) =>{
          this.carrierId = item.id
          this.feesDialog = true

          if(this.$refs.innerTable)
            await this.feesInfo.initialize(this.$refs.innerTable.$data)
        },
        addit1Ico: "mdi-cash-multiple"
      },
      feesDialog: false,
      carrierId: null,
      feesInfo: {
        headers: [
          { text: 'Название', value: 'name' },
          { text: 'Значение', value: 'value' },
          { text: 'Метод', value: 'method' },
          { text: 'Взаимодействия', value: 'actions', sortable: false },
        ],
        fields: [
          new Field("name", "Название", {rules: [t=>!!t|| "Название должно быть введено"]}),
          new Field("value", "Значение", {defaultValue: 0.00, isNumber: true, rules:[t=> {
            let floatVal = parseFloat(t);
            return (!isNaN(floatVal) && floatVal >= 0) || "Значение должно быть числом большим или равно 0"
          }]}),
          new Field("method", "Метод", {defaultValue: 0, fieldType: "select", fieldParams: {items: ()=> methods, text: "name", value: "id"}}),
          new Field("carrierId", "carrierId", {isVisible: false}),
        ],
        instanceNameRod: "сбора",
        instanceNameIm: "сбор",
        initialize: async (data) =>  {

          data.items = (await FeesController.GetByCarrierId(this.carrierId)).data;
        },
        toTableView: (data, model) => {
          if(typeof model.value === "string")
            model.value = parseFloat(model.value);
          return {
            id: model.id,
            name: model.name,
            value: model.value.toFixed(2),
            method: methods.find(t=>t.id === model.method).name,
          }
        },
        removeInstance: async (data) => {
          await FeesController.Remove(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          this.prepairData(data.editedItem, this.carrierId);
          await FeesController.Edit(data.editedItem)
        },
        addInstance: async (data, agent, editedItem) => {
          this.prepairData(agent,this.carrierId);
          let res = await FeesController.Add(agent);
          return res.data;
        }
      }
    }
  },
  methods: {
    prepairData: (agent, carrierId) =>{
      if(typeof agent.value === "string")
        agent.value = parseFloat(agent.value);
      agent.carrierId = carrierId;
    }
  },
}
</script>

<style scoped>

</style>