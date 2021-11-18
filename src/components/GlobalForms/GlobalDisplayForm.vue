<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="overflow-hidden" style="height: 100%; border-radius: 0;" flat>
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
<!--          <span class="body-1" style="margin-top: 13px; margin-right: 13px;"></span>-->
          <v-menu offset-y nudge-left="30">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item style="cursor: pointer;" @click="logout">
                <v-list-item-title>Выйти</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <template v-slot:extension>
            <v-tabs align-with-title :value="activeTab">
              <v-tab
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="navigate(tab.href)">
                {{tab.name}}
              </v-tab>
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
import store from "@/store/index"
@Component({
  components:{
    AviaToolbar,
  },
  data() {
    return {
      tabs: [
        { id: 0, name: "История", href: '/history' },
        { id: 1, name: "Перевозки", href: '/transportations' },
        { id: 2, name: "Отчеты", href: '/reports' },
        { id: 3, name: "География", href: '/stations' },
        { id: 4, name: "Перевозчики", href: '/carriers' },
        { id: 5, name: "Агенты", href: '/agents' },
        { id: 6, name: "Курсы конвертации", href: '/ConversionRate' },

      ],
    };
  },
  computed: {
    activeTab(){
      let current = this.$router.currentRoute;
      let tab = this.$data.tabs.find((t : any)=>t.href.toLowerCase() == current.fullPath.toLowerCase())
      if(tab) return tab.id
      return 1
    }
  },
  created() {
    var role = window.localStorage.getItem("role");
    if(role == "Admin"){
      this.$data.tabs.push({ id: 7, name: "Админ панель", href: '/adminPanel' })
    }
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
