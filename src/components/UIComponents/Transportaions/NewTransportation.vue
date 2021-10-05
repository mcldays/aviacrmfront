<template>
  <div>
  <v-app>
    <v-card>
      <v-toolbar
          flat
          dark
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Новая перевозка</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              @click="dialog = false"
          >
            Сохранить
          </v-btn>
        </v-toolbar-items>
        <v-menu
            bottom
            right
            offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-card-title>Общая информация</v-card-title>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-select
                  label="Перевозчик"
                  :items="items"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="Агент"
                  :items="items"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="ФИО отв"
                  :items="items"
              ></v-select>
            </v-col>
            </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="Номер А/Н"
                  required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date2"
                      label="Дата А/Н"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date2"
                    @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field
                  label="Email отв"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-select
                  label="Аэропорт вылета"
                  :items="items"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                  label="Аэропорт назначения"
                  :items="items"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                  label="Flight code"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-menu
                  v-model="menu3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date"
                      label="Дата вылета"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field
                  label="Goods Natures Code"
                  required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="Агентское вознаграждение"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
              style="height: 70px;">
            <v-col>
              <v-text-field
                  label="FZ price"
                  required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="Goods Natures Description"
                  required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-checkbox
                  v-model="ex4"
                  label="Arrival General"
                  color="indigo"
                  value="indigo"
                  hide-details
              ></v-checkbox>
              <v-checkbox
                  v-model="ex4"
                  label="Emergency"
                  color="indigo darken-3"
                  value="indigo"
                  hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-card-title>Места</v-card-title>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'


@Component({
  components:{

  }
})
export default class NewTransportation extends Vue {
  private menu2 : boolean = false;
  private menu3 : boolean = false;
}
</script>

<style scoped lang="scss">

</style>
