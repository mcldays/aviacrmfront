import VueRouter from 'vue-router'
import Transportations from "@/components/UIComponents/Transportations/Transportations.vue"
import History from "@/components/UIComponents/History/History.vue"
import Agents from "@/components/UIComponents/Agents/AgentsBase.vue"
import Carriers from "@/components/UIComponents/Carriers/CarriersNew.vue"
import Reports from "@/components/UIComponents/Reports/Reports.vue"
import ConversionRate from "@/components/UIComponents/ConversionRate/ConversionRateNew.vue"
import Stations from "@/components/UIComponents/Stations/StationsNew.vue"
import AdminPanel from "@/components/UIComponents/AdminPanel/AdminPanel.vue"

export default new VueRouter({
    routes : [
        {
            path: '/Transportations',
            component : Transportations
        },
        {
            path:'/History',
            component: History
        },
        {
            path:'/Agents',
            component: Agents
        },

        {
            path:'/Carriers',
            component: Carriers
        },

        {
            path:'/Reports',
            component: Reports
        },
        {
            path: '/ConversionRate',
            component : ConversionRate
        },
        {
            path: '/Stations',
            component : Stations
        },
        {
            path: '/AdminPanel',
            component : AdminPanel
        }
    ]
})
