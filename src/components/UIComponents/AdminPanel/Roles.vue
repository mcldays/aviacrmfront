<template>
  <div>
    <TableComponent :parent="info"></TableComponent>
  </div>
</template>

<script>
import {Field} from "@/models/Field";
import {RolesController} from "@/controllers/RolesController";
import TableComponent from "@/components/UIComponents/CRUDTableComponent";

let roles = [
  {id: 8, name: "История"},
  {id: 0, name: "Перевозки"},
  {id: 1, name: "Отчеты"},
  {id: 2, name: "География"},
  {id: 3, name: "Перевозчики"},
  {id: 4, name: "Агенты"},
  {id: 5, name: "Курсы конвертации"},
];


export default {
  components: {TableComponent},
  name: "Roles",
  data () {
    return {
      info: {
        headers: [
          { text: 'Название', value: 'name' },

        ],
        fields: [
          new Field("name", "Название", {rules: [t=> t !== null || "Название должно быть введено"]}),
        ],
        instanceNameRod: "роли",
        instanceNameIm: "роль",
        initialize: async (data) =>  {
          for (let role of roles){
            this.info.headers.push({text: role.name, value: "role" + role.id, align: "center"});
            this.info.fields.push(new Field("role" + role.id, role.name, { fieldType: "checkbox" } ));
          }
          this.info.headers.push({ text: 'Взаимодействия', value: 'actions', sortable: false, align: "center" });

          data.items = (await RolesController.GetAll()).data.map(t=> {
            let obj = {
              id: t.id,
              name: t.name
            }
            for(let role of roles){
              obj["role" + role.id] = t.chapters.includes(role.id)
            }
            return obj;
          });
        },
        toTableView: (data, model) => {
          // let viewObj = {
          //   id: model.id,
          //   name: model.name,
          // }
          // for(let role of roles){
          //   viewObj["role" + role.id] = model.chapters.includes(role.id)
          // }
          let copy = Object.assign({}, model);
          for(const [key, value] of Object.entries(model)){
            if(key.startsWith("role"))
              copy[key] = value ? "+" : "-";
          }
          return copy
        },
        removeInstance: async (data) => {
          await RolesController.Remove(data.items[data.editedIndex].id)
        },
        editInstance: async (data) => {
          let editedModel = {
            id: data.editedItem.id,
            name: data.editedItem.name,
            chapters: Object.entries(data.editedItem).filter(t=>t[0].startsWith("role") && !!t[1]).map(t=>parseInt(t[0].substr(4, 1)))
          };

          await RolesController.Edit(editedModel);

          for(let role of roles)
            data.editedItem["role" + role.id] = editedModel.chapters.includes(role.id);
        },
        addInstance: async (data, agent, editedItem) => {
          let addingModel = {
            name: agent.name,
            chapters: Object.entries(agent).filter(t=>t[0].startsWith("role") && !!t[1]).map(t=>parseInt(t[0].substr(4, 1)))
          };
          let res = await RolesController.Add(addingModel);

          for(let role of roles){
            if(!addingModel.chapters.includes(role.id))
              editedItem["role" + role.id] = false;
          }
          return res.data;
        },
      },

      dialog: false,
    }
  },
  methods: {
  },
}
</script>

<style scoped>

</style>