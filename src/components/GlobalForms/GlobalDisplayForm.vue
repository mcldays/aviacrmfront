<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="overflow-hidden" style="height: 100%" flat>
        <v-app-bar
            app
            absolute
            color="#6A76AB"
            dark
            src="@/assets/airplane.jpg"
            shrink-on-scroll
            prominent
            fade-img-on-scroll
            scroll-target="#scrolling-techniques-4"
        >
          <template v-slot:img="{ props }">
            <v-img
                v-bind="props"
                gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>



          <v-toolbar-title>Aliance Cargo</v-toolbar-title>

          <v-spacer></v-spacer>
          <span class="body-1" style="margin-top: 13px">Михаил Лялин </span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="logout">Выйти</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <template v-slot:extension>
            <v-tabs align-with-title>
              <v-tab @click="navigate('/history')">История</v-tab>
              <v-tab @click="navigate('/transportations')">Перевозки</v-tab>
              <v-tab @click="navigate('/reports')">Отчеты</v-tab>
              <v-tab @click="navigate('/stations')">География</v-tab>
              <v-tab @click="navigate('/carriers')">Перевозчики</v-tab>
              <v-tab @click="navigate('/agents')">Агенты</v-tab>
              <v-tab @click="navigate('/ConversionRate')">Курсы конвертации</v-tab>
              <v-tab @click="navigate('/adminPanel')">Odmen</v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
       <v-content>
         <v-sheet
             background="none"
             id="scrolling-techniques-4"
             class="overflow-y-auto"
             content-class="trans"
         >
           <v-container style="height: auto;" fluid>
                <slot name = "content"></slot>
           </v-container>

         </v-sheet>
       </v-content>
      </v-card>
    </v-app>
  </div>
</template>

<script lang="ts">

import { Vue, Component} from "vue-property-decorator";
import AviaToolbar from "@/components/UIComponents/aviaToolbar.vue";
import {h} from "@vue/composition-api";
@Component({
  components:{
    AviaToolbar,
  }
})
export default class GlobalDisplayForm extends Vue {

 async logout(){
   await this.$store.dispatch('logout', ).then(()=>
       this.$router.push('/aut'))
 }
  navigate (href : string): void {
    let current = this.$router.currentRoute;
    if(current.fullPath !== href)
      this.$router.push(href);
  }
}
</script>

<style scoped>
.html{
  overflow: hidden;
}
</style>
