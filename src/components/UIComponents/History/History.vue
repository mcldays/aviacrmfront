<template>
    <div style="display: flex">
      <v-row class="vrowStyle ma-0 pa-0 ">
        <v-col  >
          <v-text-field
              hide-details
              label="Номер а/н"
              solo
          ></v-text-field>

          <v-text-field
              hide-details
              label="Дата а/н"
              solo
          ></v-text-field>

          <v-text-field
              hide-details
              label="Станция"
              solo
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="vrowStyle">
        <v-col>
          <v-text-field
              class="textInputStyle"
              hide-details
              label="Агент"
              solo
          ></v-text-field>

          <v-text-field
              class="textInputStyle"
              hide-details
              label="Дата вылета"
              solo
          ></v-text-field>

          <v-text-field
              hide-details
              label="Рейс"
              solo
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="vrowStyle" style="margin: auto;">
        <v-col>
          <v-btn
              block
              elevation="2"
          >
            Найти
          </v-btn>
        </v-col>
      </v-row>
    </div>
</template>

<script>
  export default {
    name: "Finder"
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

<script>
export default {
  name: "History"
}
</script>

<style scoped>

</style>
