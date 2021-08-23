import {ITEMS, SELECTED_ITEM, LOADING, STATE, ADD_ITEM, REMOVE_ITEM} from '../types'
import {defaultState} from "@/store/state";
import Request from "plugin-tigre-request";

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
        }
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
        },
        [ADD_ITEM](state, item){
            if (state.items === undefined) state.items = [item]
            else state.items.push(item)
        },
        [REMOVE_ITEM](state, item){
            console.log('item', item)
            state.items.splice(state.items.indexOf(item), 1)
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
                    path: '/api/user'
                })
                commit(ITEMS, response.data)
            }
            catch (e) {
                console.error('error on get', e)
            }
            finally {
                commit(LOADING, false)
            }
        },
        handleAddItem({commit}, payload) {
            commit(ADD_ITEM, payload.item)
        },
        handleRemoveItem({commit}, payload) {
            commit(REMOVE_ITEM, payload.item)
        }
    }
}