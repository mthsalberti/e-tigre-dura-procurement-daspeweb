import {ITEMS, SELECTED_ITEM, LOADING, STATE, ADD_ITEM, REMOVE_ITEM, ADD_FILTER_ITEM} from '../types'
import {defaultState} from "@/store/state";
import Request from "plugin-tigre-request";
import axios from "axios";

export default {
    namespaced: true,
    state: defaultState({isLoading: false}),
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
        [ITEMS](state, items) {
            state.items = items
        },
        [SELECTED_ITEM](state, payload) {
            state.selectedItem = payload.selectedItem
        },
        [LOADING](state, isLoading /* boolean */) {
            state.isLoading = isLoading
        },
        [STATE](state, newState) {
            Object.keys(newState)
                .forEach(nsk => {
                    state[nsk] = newState[nsk]
                })
        },
        [ADD_ITEM](state, item) {
            state.items.push(item)
        },
        [REMOVE_ITEM](state, item) {
            state.items.splice(state.items.indexOf(item), 1)
        },
        [ADD_FILTER_ITEM](state, item) {
            state.filter.add(item)
        }
    },
    actions: {
        clearState({commit}) {
            return commit(STATE, defaultState({isLoading: false}))
        },
        async handleGetData({commit}, payload) {
            try {
                commit(LOADING, true)
                let {purchaseId} = payload
                await commit(ADD_FILTER_ITEM, {
                    name: 'purchaseId',
                    field: 'purchase_id',
                    operator: '=',
                    value: purchaseId
                })
                let response = await Request({
                    baseUrl: process.env.VUE_APP_BASE_URL,
                    path: `/custom/purchase_item_from_purchase/${purchaseId}`
                })
                console.log('response', response)
                commit(ITEMS, response.data[0])
            } catch (e) {
                console.error('error on get', e)
            } finally {
                commit(LOADING, false)
            }
        },
        handleAddItem({commit}, payload) {
            commit(ADD_ITEM, payload.item)
        },
        handleRemoveItem({commit}, payload) {
            commit(REMOVE_ITEM, payload.item)
        },
        async handleAddItems(_, payload) {
            let {items} = payload
            items = items.map(i => {
                delete i['department_description']
                return i
            })
            let response = await axios.put(`${process.env.VUE_APP_BASE_URL}/purchase_item`, items)
            return response.data
        }
    }
}