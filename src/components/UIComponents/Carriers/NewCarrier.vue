<template>
  <div style="display: flex;">
    <v-row class="vrowStyle ma-0 pa-0 ">
      <v-col  >
        <v-card-title style="padding: 0 0">Новый перевозчик
          <v-btn
              color="blue darken-1"
              text
              @click="editFees"
          >
            Сборы
          </v-btn>
        </v-card-title>

        <v-card
            v-show="feesVision"
        >
          <v-form
              ref="form"
              v-model="is_valid">
            <v-card-title>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="addFees"
              >
                Добавить
              </v-btn>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>

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
                  <template v-slot:item.nameRedactor="{ item }">
                    <v-text-field
                        hide-details
                        solo
                        v-bind:value="getItemName(item)"
                    ></v-text-field>
                  </template>
                  <template v-slot:item.valueRedactor="{ item }">
                    <v-text-field
                        hide-details
                        solo
                        v-bind:value="getItemValue(item)"
                    ></v-text-field>
                  </template>
                  <template v-slot:item.methodRedactor="{ item }">
                    <v-select
                        hide-details
                        solo
                        v-bind:value="getItemMethod(item)"
                    ></v-select>
                  </template>

                </v-data-table>

              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Отмена
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>


        <v-text-field
            hide-details
            label="Имя"
            solo
        ></v-text-field>
        <v-text-field
            hide-details
            label="Префикс"
            solo
        ></v-text-field>
        <v-select style="padding: 0 5px !important;"
            label="Тип перевозчика"
            :items="items"
        ></v-select>
        <v-btn
            @click="add"
            block
            elevation="3"
        >
          Сохранить
        </v-btn>
      </v-col>

    </v-row>
  </div>
</template>

<script lang="ts">

import {Component, Model, Prop, Vue} from 'vue-property-decorator'

@Component({
  components:{

  }
})
export default class NewCarrier extends Vue {
  private feesVision : boolean = false;

  editFees()
  {
    this.feesVision = !this.feesVision;
  }
  addFees()
  {

  }
  getItemName(item :any){
    return item.nameRedactor;
  }
  getItemValue(item :any){
    return item.valueRedactor;
  }
  getItemMethod(item :any){
    return item.methodRedactor;
  }
  private headers : object = [
    { text: 'Fees name', value: 'nameRedactor', sortable: false},
    { text: 'Value', value: 'valueRedactor', sortable: false},
    { text: 'Calculation method', value: 'methodRedactor', sortable: false},
    { text: '', value: 'actions', sortable: false },
  ];
  private lorem : object = [
    {
      nameRedactor: 'FlyDubai',
      valueRedactor:'4',
      methodRedactor: 'Airline',
    },
    {
      nameRedactor: 'FlyHuai',
      valueRedactor:'4',
      methodRedactor: 'Airline',
    },
  ]

}

</script>

<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;
}

</style>
