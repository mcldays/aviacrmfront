<template>
  <v-app>
<div style="display: flex; width: 50%; margin: 15% auto;">
<v-row class="vrowStyle ma-0 pa-0 ">
  <v-col  >
    <v-card-title style="padding: 0 0">Авторизация</v-card-title>
  <v-form>
    <v-text-field
        hide-details
        label="Email"
        solo
        v-model="login"
    ></v-text-field>

    <v-text-field
        type="password"
        hide-details
        label="Пароль"
        solo
        v-model="password"
    ></v-text-field>
    <v-btn
        block
        elevation="3"
        @click="authorization"
    >
      Войти
    </v-btn>
  </v-form>
  </v-col>

</v-row>
</div>
    <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        right
    >
      Неверное имя пользователя или пароль
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
@Component({
  components:{

  }
})

export default class Authorization extends Vue {
  private login : string = ""
  private password : string = ""
  private snackbar : boolean = false;

  async authorization(){
    let login = this.login
    let password = this.password
    await this.$store.dispatch('login', { login, password }).then(()=>
         this.$router.push('/Transportations')
     ).catch(()=>{
       this.snackbar =true
    })
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
  padding: 5px 0px!important;
}
</style>
