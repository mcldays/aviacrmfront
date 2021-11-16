import Vue from 'vue'
import Vuex from 'vuex'
import { GetterTree, MutationTree, ActionTree } from "vuex"
import Axios from '@/../axios_settings';
import {AutController} from "@/controllers/AutController";


Vue.use(Vuex)

class State {
    status : string = ''
    token: string =  localStorage.getItem('token') || ''
    user : any = {}
}

const getters = <GetterTree<State, any>>{
    isLoggedIn: state => !!state.token,
    getToken : state => state.token
};

const mutations = <MutationTree<State>><unknown>{
    auth_success(state : State, token : any, autUser: any) {
        state.status = 'success'
        state.token = token
        state.user = autUser
    },
    auth_error(state : any){
        state.status = 'error'
    },
    logout(state : any){
        state.status = ''
        state.token = ''
        localStorage.setItem('token', '')
    },
};

const actions = <ActionTree<State, any>>{
    login(store, user){
        let token : string = ""
        return new Promise((resolve, reject) => {
            this.commit('auth_request')
            AutController.Autorization(user.login, user.password)
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    Axios.defaults.headers.common['Bearer'] = token
                    this.commit('auth_success', token, user)
                    resolve(resp)
                })
                .catch(err => {
                    this.commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
        localStorage.setItem('token', token)
        Axios.defaults.headers.common['Bearer'] = token
        this.commit('auth_success', token, user)
    },
    logout(){
        return new Promise((resolve, reject) => {
            this.commit('logout')
            localStorage.removeItem('token')
            delete Axios.defaults.headers.common['Bearer']
            resolve()
        })
    }

};

export default new Vuex.Store({
    state: new State(),
    mutations: mutations,
    actions: actions,
    getters : getters
})
