<template>
  <v-container>
    <v-row>
      <v-col>
    <v-text-field
            label="Номер а/н"
            v-model = this.numberAN>
    </v-text-field>
      </v-col>
      <v-col style="display: flex">
        <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="230px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                class="ml-3"
                v-model="date"
                style="width: 200px;"
                label="Дата а/н от"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              @input="menu = false"
          >
          </v-date-picker>
        </v-menu>
        <span style="margin: auto; font-weight: bold">-</span>
        <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="230px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                class="ml-3"
                style="width: 200px;"
                v-model="date2"
                label="До"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date2"
              @input="menu2 = false"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col style="display: flex; width: 500px">
        <v-select
            style="width: 200px;"
            class="ml-3"
            label="Станция от"
            :items="airportFrom"
            required
            item-text="name"
            item-value="id"
        ></v-select>
        <span style="margin: auto; font-weight: bold">-</span>
        <v-select
            class="ml-3"
            style="width: 200px;"
            label="До"
            :items="airportTo"
            required
            item-text="name"
            item-value="id"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
            class="ml-3"
            style="width: 200px;"
            label="Агент"
            :items="agents"
            required
            item-text="name"
            item-value="id"
        ></v-select>
      </v-col>
      <v-col>
        <v-menu
            ref="menu"
            v-model="menu3"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="230px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                class="ml-3"
                style="width: 200px;"
                v-model="dateOfLeave"
                label="Дата вылета"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="dateOfLeave"
              @input="menu3 = false"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field
            label="Рейс"
            v-model="this.flightCode">
        </v-text-field>
      </v-col>
      <v-col class="auto">
        <v-btn @click="find">
          Найти
        </v-btn>
      </v-col>
    </v-row>
 </v-container>

</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import NewTransportation from "@/components/UIComponents/Transportations/NewTransportation.vue";
import {StationsController} from "@/controllers/StationsController"
import {AgentsController} from "@/controllers/AgentsController";
@Component({
  components:{

  },
})
export default class  Finder extends Vue{
  name: "Finder"
  private menu : boolean = false
  private menu2 : boolean = false
  private menu3 : boolean = false
  private date : string = ""
  private date2 : string = ""
  private dateOfLeave :  string = ""
  private numberAN : number = 0
  private station : any = []
  private agents : any = []
  private flightCode : string = ""
  private airportFrom : object[] = []
  private airportTo : object[] = []

  created(){
    let result = this.preparedData()
  }
  async preparedData(){
    let stations = await StationsController.GetAll()
    let models = this.prepareDataFromAirports(stations.data)
    this.agents =  this.prepareDataForSelect((await AgentsController.GetAll()).data)

    this.airportFrom = models[0]
    this.airportTo = models[1]
  }

  prepareDataFromAirports(model : any[]) : [object[], object[]]{
    let airportsTo : any[] = []
    let airportsFrom : any[] = []
    for (let modElement of model) {
      if(modElement.isDeparture){
        airportsFrom.push({
          name: modElement.name,
          id : modElement.id
        })
      }
      else{
        airportsTo.push({
          name: modElement.name,
          id : modElement.id
        })
      }
    }
    return [airportsFrom, airportsTo]

  }
  prepareDataForSelect(model:any[]){
    let pushModel : any[] = []
    for (let modelElement of model) {
      pushModel.push({
        name: modelElement.name,
        id : modelElement.id
      })
    }
    return pushModel
  }
  find(){
    let findObject = {
        number: this.numberAN,
        dateANFrom : this.date,
        dateANTo : this.date2,
        airportFrom : this.airportFrom,
        airportTo : this.airportTo,
        agent : this.agents,
        dateOfLeave : this.dateOfLeave,
        flightCode : this.flightCode
    }
    this.$emit("find", findObject)
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
.col{
max-width: 1000px;
}


.v-input{
  padding: 5px !important;
}
</style>
