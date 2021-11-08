<template>
  <div style="display: flex;">
    <v-row class="vrowStyle ma-0 pa-0 ">
      <v-col  >
        <v-card-title style="padding: 0 0">Новый перевозчик</v-card-title>

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
          Добавить
        </v-btn>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  name: "NewCarrier",
  add()
  {

  }
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
  padding: 5px 0 !important;
}
</style>
