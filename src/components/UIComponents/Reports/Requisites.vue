<template scrollable>
  <v-app>
    <div id="app" >
      <v-card>
        <v-card-title>Реквизиты отчетов</v-card-title>
        <v-container>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="Имя главного бухгалтера"
                  v-model="requisites.chiefAccountant"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  v-model="requisites.bankRequisites"
                  label="Банковские реквизиты"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  v-model="requisites.companyAddres"
                  label="Адрес компании"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  v-model="requisites.nameSign"
                  label="Имя подписанта со стороны компании"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  id="fdf"
                  v-model="requisites.postSign"
                  label="Должность подписанта со стороны компании"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-btn
                  @click="Save"
                  block
                  elevation="2"
              >
                Сохранить
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                  @click="Cancel"
                  block
                  elevation="2"
              >
                Отмена
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import 'vue-resize/dist/vue-resize.css'
import {RequisitesModel} from "@/models/reports/RequisitesModel";
import {RequisitesController} from "@/controllers/ReportsControllers/RequisitesController";
import {StationsController} from "@/controllers/StationsController";

@Component({
  components:{
  }
})
export default class ListCarriers extends Vue {
  private requisites = new RequisitesModel();
  Save()
  {
    let controller = new RequisitesController()
    controller.UpdateReq(this.requisites)
  }
  Cancel()
  {
    console.log(this.requisites)
  }
  async mounted(){
    let controller = new RequisitesController()
    await controller.GetAllReq().then((t: any)=>{
      this.requisites = t.data

    })
  }
}

</script>

<style scoped>

</style>
