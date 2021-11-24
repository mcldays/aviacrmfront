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
                  :value="requisites.ChiefAccountant"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  :value="requisites.BankRequisites"
                  label="Банковские реквизиты"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  :value="requisites.CompanyAddres"
                  label="Адрес компании"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  :value="requisites.NameSign"
                  label="Имя подписанта со стороны компании"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  :value="requisites.PostSign"
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
    this.requisites.Id = 0;
    controller.UpdateReq(this.requisites)
  }
  Cancel()
  {

  }
  async mounted(){
    let controller = new RequisitesController()
    await controller.GetAllReq().then((t: any)=>{
      alert(t.data)
      for (let datum of t.data) {
        if(datum.id ==0)
        {
          this.requisites = datum
        }
      }
    })
  }
}

</script>

<style scoped>

</style>
