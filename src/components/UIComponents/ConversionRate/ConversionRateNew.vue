<template>
  <v-app>
    <TableComponent :parent="info"></TableComponent>
  </v-app>
</template>

<script>
import {Field} from "@/models/Field";
import TableComponent from "@/components/UIComponents/CRUDTableComponent";
import {ConversionRateController} from "@/controllers/ConversionRateController";

export default {
  name: "ConversionRateNew",
  components: {TableComponent},
  data () {
    return {
      info: {
        headers: [
          { text: 'Дата', value: 'date' },
          { text: 'Значение', value: 'value' },
          { text: 'Взаимодействия', value: 'actions_remove', sortable: false },
        ],
        fields: [
          new Field("date", "Дата", {
            fieldType: "datepicker",
            defaultValue: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
          }),
          new Field("value", "Значение", {isNumber: true, rules: [t=>{
              let floatVal = parseFloat(t);
              return (!isNaN(floatVal) && floatVal >= 0) || "Значение должно быть числом большим или равно 0"
            }]}),
        ],
        instanceNameRod: "курс",
        instanceNameIm: "курс",
        initialize: async (data) =>  {
          data.items = (await ConversionRateController.GetAll()).data;
        },
        toTableView: (data, model) => {
          let date = new Date(model.date);
          let strDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

          return {
            id: model.id,
            date: strDate,
            value: model.value.toFixed(2)
          }
        },
        removeInstance: async (data) => {
          await ConversionRateController.Remove(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          this.prepairData(data.editedItem);
          await ConversionRateController.Edit(data.editedItem)
        },
        addInstance: async (data, agent) => {
          this.prepairData(agent);
          let res = await ConversionRateController.Add(agent);
          return res.data;
        }
      },
    }
  },
  methods: {
    prepairData: (data) =>{
      if(typeof data.value === "string")
        data.value = parseFloat(data.value);
    }
  },
}
</script>

<style scoped>

</style>