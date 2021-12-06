<template>
  <div>
    <TableComponent :parent="info"></TableComponent>
  </div>
</template>

<script>
import {Field} from "@/models/Field";
import TableComponent from "@/components/UIComponents/CRUDTableComponent";
import {ConversionRateController} from "@/controllers/ConversionRateController";
import moment from "moment";

export default {
  name: "ConversionRateNew",
  components: {TableComponent},
  data () {
    return {
      info: {
        headers: [
          { text: 'Дата', value: 'date', sort: (a,b) => this.compareDates(moment(a, "dd.MM.yyyy").toDate(), moment(b, "dd.MM.yyyy").toDate()) },
          { text: 'Значение', value: 'value' },
          { text: 'Взаимодействия', value: 'actions_remove', sortable: false, align: "center" },
        ],
        fields: [
          new Field("date", "Дата", {
            fieldType: "datepicker",
            defaultValue: new Date().toISOString().substr(0, 10)
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
          // this.prepairData(data.editedItem);
          // await ConversionRateController.Edit(data.editedItem)
          return false;
        },
        addInstance: async (data, agent, editedItem) => {
          this.prepairData(agent);
          this.prepairData(editedItem);
          let res = await ConversionRateController.Add(agent);
          return res.data;
        },
        sortBy: "date",
        sortDesc: true
      },

    }
  },
  methods: {
    prepairData: (data) =>{
      if(typeof data.value === "string")
        data.value = parseFloat(data.value);
    },
    convert:function(d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp)
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return (
          d.constructor === Date ? d :
              d.constructor === Array ? new Date(d[0],d[1],d[2]) :
                  d.constructor === Number ? new Date(d) :
                      d.constructor === String ? new Date(d) :
                          typeof d === "object" ? new Date(d.year,d.month,d.date) :
                              NaN
      );
    },
    compareDates: function (a,b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return (
          isFinite(a=this.convert(a).valueOf()) &&
          isFinite(b=this.convert(b).valueOf()) ?
              (a>b)-(a<b) :
              NaN
      );
    },
  },
}
</script>

<style scoped>

</style>
