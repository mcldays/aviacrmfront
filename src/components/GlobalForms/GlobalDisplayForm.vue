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
              <v-tab @click="$router.push('/history')">История</v-tab>
              <v-tab @click="$router.push('/transportations')">Перевозки</v-tab>
              <v-tab @click="$router.push('/reports')">Отчеты</v-tab>
              <v-tab @click="$router.push('/stations')">География</v-tab>
              <v-tab @click="$router.push('/tarifs')">Тарифы</v-tab>
              <v-tab @click="$router.push('/carriers')">Перевозчики</v-tab>
              <v-tab @click="$router.push('/agents')">Агенты</v-tab>
              <v-tab @click="$router.push('/ConversionRate')">Курсы конвертации</v-tab>
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
@Component({
  components:{
    AviaToolbar,
  }
})
export default class GlobalDisplayForm extends Vue {
  private menuItems : object[] = [{title : "Залупа"}]
 mounted(){
  let height =  this.$refs.trans;
 }
 async logout(){
   await this.$store.dispatch('logout', ).then(()=>
       this.$router.push('/aut'))
 }
}
</script>

<style scoped>
.html{
  overflow: hidden;
}
</style>
