<template>
  <div style="display: flex">
    <v-row class="vrowStyle ma-0 pa-0 ">
      <v-col  >
        <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date1"
                label="С"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date1"
              @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
        <v-btn
            @click="findExpenses"
            block
            elevation="2"
        >
          Найти
        </v-btn>
      </v-col>
      <v-col  >
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
                label="По"
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
                v-model="date3"
                label="Дата курса"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date3"
              @input="menu3 = false"
          ></v-date-picker>
        </v-menu>

      </v-col>
      <v-col  >
        <v-select
            label="Агент"
            :items="items"
        ></v-select>
        <v-select
            label="Перевозчик"
            :items="items"
        ></v-select>
      </v-col>
    </v-row>

    <v-row class="vrowStyle" style="margin: auto;">
      <v-col>
        <v-btn
            @click="findExpenses"
            block
            elevation="2"
            color="green"
        >
          Утвердить отчет
        </v-btn>
        <v-btn
            style="margin-top: 10px"
            @click="findExpenses"
            block
            elevation="2"
            color="blue"
        >
          Экспорт
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {Vue} from "vue-property-decorator";

export default {
  name: "FindReport",
  data() {
    return {
      menu1: false,
      menu2: false,
      menu3: false
    }
  },
}
</script>

<style scoped>
.vrowStyle{
  padding: 0 50px 0 0;
}
.v-text-field{
  padding: 5px
}

.v-input{
  padding: 5px !important;
}
</style>