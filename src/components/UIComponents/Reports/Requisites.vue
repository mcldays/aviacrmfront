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
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="Банковские реквизиты"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="Адрес компании"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="Имя подписанта со стороны компании"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
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
import FindReport from "@/components/UIComponents/Reports/ReportToBank/FindReport.vue";

@Component({
  components:{
    FindReport
  }
})
export default class ListCarriers extends Vue {
  Save()
  {

  }
  Cancel()
  {

  }

}

</script>

<style scoped>

</style>
