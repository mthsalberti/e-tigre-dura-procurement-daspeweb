import {
    ITEMS,
    SELECTED_ITEM,
    LOADING,
    STATE,
    ADD_FILTER_ITEM,
    REMOVE_FILTER_ITEM,
    OVERRIDE_FILTER,
    ADD_ITEM
} from '../types'
import {defaultState} from "@/store/state";
import Request from 'plugin-tigre-request';
import axios from "axios";
import {Filter} from "../../../utils";

let withsJSON = [
    {
        table: 'vendor',
        from: 'vendor_id',
        to: 'id',
        alias: 'vendor',
        column_merge: 'name'
    },
    {
        table: 'department',
        from: 'requested_by_department',
        to: 'id',
        alias: 'department',
        column_merge: 'description'
    },
    {
        table: 'user',
        from: 'requested_by',
        to: 'id',
        alias: 'requested_by_user',
    },
    {
        table: 'purchase_status',
        from: 'status_id',
        to: 'id',
        alias: 'status',
        column_merge: 'description'
    },
    {
        table: 'purchase',
        from: 'parent_id',
        to: 'id',
        alias: 'order',
        column_merge: 'id'
    },
    {
        table: 'user',
        from: 'designated_receiver_id',
        to: 'id',
        alias: 'designed_receiver'
    },
    {
        table: 'user',
        from: 'createdBy',
        to: 'id',
        alias: 'created_by_user'
    },
    {
        table: 'department',
        from: 'created_by_department',
        to: 'id',
        alias: 'created_by_department_alias',
    },
]

export default {
    namespaced: true,
    state: defaultState({
        withs: Filter.jsonToBase64(withsJSON),
        withsJSON
    }),
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
        getWithsJSON(state) {
            return state.withsJSON
        }
    },
    mutations: {
        [ITEMS](state, items) {
            state.items = items
        },
        [ADD_ITEM](state, item) {
            state.items = [...state.items, ...[item]]
        },
        [SELECTED_ITEM](state, item) {
            state.selectedItem = item
        },
        [LOADING](state, isLoading /* boolean */) {
            state.isLoading = isLoading
        },
        [STATE](state, newState) {
            state = newState
        },
        [ADD_FILTER_ITEM](state, item) {
            state.filter.add(item)
        },
        [REMOVE_FILTER_ITEM](state, item) {
            state.filter.remove(item)
        },
        [OVERRIDE_FILTER](state, filterJson) {
            state.filter.override(filterJson)
        }
    },
    actions: {
        clearState({commit}) {
            commit(STATE, defaultState())
        },
        async handleGetData({commit}) {
            try {
                commit(LOADING, true)
                // let response = await Request({
                //     baseUrl: process.env.VUE_APP_BASE_URL,
                //     path: `/purchase?with=${state.withs}`
                // })
                let response = await Request({
                    baseUrl: process.env.VUE_APP_BASE_URL,
                    path: `/custom/purchase`
                })
                commit(ITEMS, response.data[0])
            } catch (e) {
                console.error('error on get', e)
            } finally {
                commit(LOADING, false)
            }
        },
        handleSetSelectedItem({commit}, payload) {
            let {item} = payload
            commit(SELECTED_ITEM, item)
        },
        async handleGetItem({commit}, payload) {
            try {
                await commit(LOADING, true)
                let {id} = payload
                // let response = await Request({
                //     baseUrl: process.env.VUE_APP_BASE_URL,
                //     path: `/purchase/${id}?with=${state.withs}`,
                // })
                let response = await Request({
                    baseUrl: process.env.VUE_APP_BASE_URL,
                    path: `/custom/purchase/${id}`,
                })
                console.log('aqui ó', response.data[0][0])
                return response.data[0][0]
            }
            catch (e) {
                console.error('ERROR on handleGetItem', e)
            }
            finally {
                commit(LOADING, false)
            }
        },
        async addItem(_, payload) {
            try {
                let {item} = payload
                let response = await axios.put(`${process.env.VUE_APP_BASE_URL}/purchase`, item)
                console.log('response', response)
                return response.data.data[0]
            }
            catch (e) {
                console.error('e', e)
            }
        },
        async removeItem(_, payload) {
            try {
                let {id} = payload
                let response = await axios.delete(`${process.env.VUE_APP_BASE_URL}/delete_purchase/${id}`)
                console.log('delete response', response)
                // await commit(ADD_ITEM, item)
            }
            catch (e) {
                console.error('ERROR on delete item',)
            }
        },
        addFilterItem({commit}, payload) {
            let {item} = payload
            commit(ADD_FILTER_ITEM, item)
        },
        removeFilterItem({commit}, payload) {
            let {item} = payload
            commit(REMOVE_FILTER_ITEM, item)
        },
        overrideFilter({commit}, payload) {
            let {filter} = payload
            commit(OVERRIDE_FILTER, filter)
        },
    }
}