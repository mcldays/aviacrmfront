import VueRouter from 'vue-router'
import Transportations from "@/components/UIComponents/Transportations/Transportations.vue"
import History from "@/components/UIComponents/History/History.vue"
import Agents from "@/components/UIComponents/Agents/Agents.vue"
import Carriers from "@/components/UIComponents/Carriers/Carriers.vue"
import Reports from "@/components/UIComponents/Reports/Reports.vue"
import ConversionRate from "@/components/UIComponents/ConversionRate/ConversionRate.vue"
import Stations from "@/components/UIComponents/Stations/Stations.vue"
import Tarifs from "@/components/UIComponents/Tarifs/Tarifs.vue"
import Autorization from "@/components/GlobalForms/Authorization.vue"


export default new VueRouter({
    routes : [
        {
            path: '/aut',
            components : {
                aut : Autorization
            },
            name : "Aut"
        },
        {
            path: '/Transportations',
            component : Transportations,
            name : "Transportations",
            meta: {
                requiresAuth: true
            }
        },
        {
            path:'/History',
            component: History,
            meta: {
                requiresAuth: true
            }
        },
        {
            path:'/Agents',
            component: Agents,
            meta: {
                requiresAuth: true
            }
        },

        {
            path:'/Carriers',
            component: Carriers,
            meta: {
                requiresAuth: true
            }
        },

        {
            path:'/Reports',
            component: Reports,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/ConversionRate',
            component : ConversionRate,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Stations',
            component : Stations,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Tarifs',
            component : Tarifs,
            meta: {
                requiresAuth: true
            }
        }
    ]
})
