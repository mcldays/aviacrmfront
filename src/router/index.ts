import VueRouter from 'vue-router'
import Transportations from "@/components/UIComponents/Transportaions/Transportations.vue";
import History from "@/components/UIComponents/History/History.vue"
export default new VueRouter({
    routes : [
        {
            path: '/Transporations',
            component : Transportations
        },
        {
            path:'/History',
            component: History
        },
    ]
})
