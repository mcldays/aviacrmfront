import VueRouter from 'vue-router'
import Transportations from "@/components/UIComponents/Transportations/Transportations.vue"
import History from "@/components/UIComponents/History/History.vue"
import Agents from "@/components/UIComponents/Agents/Agents.vue"
import Carriers from "@/components/UIComponents/Carriers/Carriers.vue"
import Reports from "@/components/UIComponents/Reports/Reports.vue"

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
        }
    ]
})
