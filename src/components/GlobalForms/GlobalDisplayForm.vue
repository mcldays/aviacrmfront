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

          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Aliance Cargo</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <template v-slot:extension>
            <v-tabs align-with-title>
              <v-tab @click="$router.push('/history')">История</v-tab>
              <v-tab @click="$router.push('/transportations')">Перевозки</v-tab>
              <v-tab @click="$router.push('/reports')">Отчеты</v-tab>
              <v-tab>География</v-tab>
              <v-tab>Тарифы</v-tab>
              <v-tab @click="$router.push('/carriers')">Перевозчики</v-tab>
              <v-tab @click="$router.push('/agents')">Агенты</v-tab>
              <v-tab>Курсы конвертации</v-tab>
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
 mounted(){
  let height =  this.$refs.trans;
 }
}
</script>

<style scoped>
.html{
  overflow: hidden;
}
</style>
