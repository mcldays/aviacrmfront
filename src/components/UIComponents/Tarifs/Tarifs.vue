<template>
<v-app>
    <v-card
    >
      <v-form
          ref="form"
          v-model="is_valid">
        <v-card-title>
          <div style="display: flex; width: 100%">
          <v-tabs style="float: left">
            <v-tab @click="tarifType = 'ACTarifs'">Тарифы а/к</v-tab>
            <v-tab @click="tarifType = 'AgentTarifs'">Тарифы агентов</v-tab>
          </v-tabs>
            <div style="width: 30px"></div>
          <v-tabs style="float: left">
            <v-tab @click="tarifCarrier = 'FlyDubai'">FlyDubai</v-tab>
            <v-tab @click="tarifCarrier = 'Pegasus'">Pegasus</v-tab>
            <v-tab @click="tarifCarrier = 'TurkishAirlines'">Turkish Airlines</v-tab>

          </v-tabs>
            <div style="float: right">
              <v-btn
                  color="green darken-1"
                  text
                  @click="addTarif"
              >
                Добавить
              </v-btn>
            </div>
          </div>
        </v-card-title>
            <v-data-table
                :headers="headers"
                :items="lorem"
                :items-per-page="5"
                class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>

              <template v-slot:item.rDestination="{ item }">
                <v-text-field
                    hide-details
                    solo
                    v-bind:value="getItemValue(item.rDestination)"
                ></v-text-field>
              </template>
              <template v-slot:item.rMin="{ item }">
                <v-text-field
                    hide-details
                    solo
                    v-bind:value="getItemValue(item.rMin)"
                ></v-text-field>
              </template>
              <template v-slot:item.rNormal="{ item }">
                <v-text-field
                    hide-details
                    solo
                    v-bind:value="getItemValue(item.rNormal)"
                ></v-text-field>
              </template>
              <template v-slot:item.r45="{ item }">
                <v-text-field
                    hide-details
                    solo
                    v-bind:value="getItemValue(item.r45)"
                ></v-text-field>
              </template>
              <template v-slot:item.r100="{ item }">
                <v-text-field
                    hide-details
                    solo
                    v-bind:value="getItemValue(item.r100)"
                ></v-text-field>
              </template>
              <template v-slot:item.r300="{ item }">
                <v-text-field
                    hide-details
                    solo
                    v-bind:value="getItemValue(item.r300)"
                ></v-text-field>
              </template>
              <template v-slot:item.r500="{ item }">
                <v-text-field
                    hide-details
                    solo
                    v-bind:value="getItemValue(item.r500)"
                ></v-text-field>
              </template>
              <template v-slot:item.r1000="{ item }">
                <v-text-field
                    hide-details
                    solo
                    v-bind:value="getItemValue(item.r1000)"
                ></v-text-field>
              </template>

            </v-data-table>
      </v-form>
    </v-card>
</v-app>
</template>

<script lang="ts">

import {Component, Model, Prop, Vue} from 'vue-property-decorator'

@Component({
  components:{

  }
})
export default class Tarifs extends Vue {
  addTarif()
  {

  }
  private tarifType : any = "";
  private tarifCarrier : any = "";

  getItemValue(value :any){
    return value;
  }
  private headers : object = [
    { text: 'Destination', value: 'rDestination', sortable: false},
    { text: 'Min', value: 'rMin', sortable: false},
    { text: 'Normal', value: 'rNormal', sortable: false},
    { text: '45', value: 'r45', sortable: false},
    { text: '100', value: 'r100', sortable: false},
    { text: '300', value: 'r300', sortable: false},
    { text: '500', value: 'r500', sortable: false},
    { text: '1000+', value: 'r1000', sortable: false},

    { text: '', value: 'actions', sortable: false },
  ];
  private lorem : object = [
    {
      rDestination: 'ABJ',
      rMin:'210',
      rNormal: '210',
      r45: '210',
      r100: '210',
      r300:'210',
      r500: '210',
      r1000: '210'
    },
    {
      rDestination: 'ABV',
      rMin:'210',
      rNormal: '210',
      r45: '210',
      r100: '210',
      r300:'210',
      r500: '210',
      r1000: '210'
    }
  ]

}

</script>

<style scoped>

</style>