import {ITEMS, SELECTED_ITEM, LOADING, STATE} from '../types'
import {defaultState} from "@/store/state";
import Request from 'plugin-tigre-request';


export default {
    namespaced: true,
    state: defaultState(),
    getters: {
        getItems(state) {
            return state.items
        },
        getSelectedItem(state) {
            return state.selectedItem
        },
        getLoading(state) {
            return state.isLoading
        },
    },
    mutations: {
        [ITEMS](state, payload) {
            state.items = payload.items
        },
        [SELECTED_ITEM](state, payload) {
            state.selectedItem = payload.selectedItem
        },
        [LOADING](state, isLoading /* boolean */) {
            state.isLoading = isLoading
        },
        [STATE](state, newState) {
            state = newState
        }
    },
    actions: {
        clearState({commit}){
            commit(STATE, defaultState())
        },
        async handleGetData({commit}, payload = {}) {
            try {
                console.log(payload)
                commit(LOADING, true)
                let response = await Request({
                    baseUrl: process.env.VUE_APP_BASE_URL,
                    path: '/api/purchase'
                })
                commit(ITEMS, response.data)
            }
            catch (e) {
                console.error('error on get', e)
            }
            finally {
                commit(LOADING, false)
            }
        }
    }
}