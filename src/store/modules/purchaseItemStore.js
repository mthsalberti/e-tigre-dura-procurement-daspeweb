import {ITEMS, SELECTED_ITEM, LOADING, STATE, ADD_ITEM, REMOVE_ITEM, ADD_FILTER_ITEM, UPDATE_ITEM} from '../types'
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
        },
        [UPDATE_ITEM](state, {current, replace}) {
            console.log('state', state)
            console.log('current', current)
            console.log('replace', replace)
            state.items[state.items.indexOf(current)] = {...current, ...replace}
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
                let response = await Request({
                    baseUrl: process.env.VUE_APP_BASE_URL,
                    path: `/custom/purchase_item_from_purchase/${purchaseId}`
                })
                console.log('response.data[0] purchaseItem', response.data[0])
                await commit(ITEMS, response.data[0])
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
            items = await Promise.all(items.map(i => {
                delete i['department_description']
                return new Promise(resolve => resolve(i))
            }))
            console.log('items', items)
            let response = await axios.put(`${process.env.VUE_APP_BASE_URL}/purchase_item`, items)
            return response.data
        },
        handleUpdateItem({commit}, payload) {
            let {current, replace} = payload
            console.log('current handleUpdateItem', current)
            console.log('replace handleUpdateItem', replace)
            commit(UPDATE_ITEM, {current, replace})
        }
    }
}