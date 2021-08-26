import {ITEMS, SELECTED_ITEM, LOADING, STATE, ADD_FILTER_ITEM} from '../types'
import {defaultState} from "@/store/state";
import Request from "plugin-tigre-request";

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
        [SELECTED_ITEM](state, item ) {
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
        }
    },
    actions: {
        clearState({commit}){
            commit(STATE, defaultState())
        },
        async handleSearch({commit, state}, payload = {}) {
            try {
                let {value} = payload
                //setting filter
                await commit(ADD_FILTER_ITEM, {
                    name: 'term',
                    field: 'description',
                    operator: 'like',
                    value: `%${value}%`
                })
                if (value) {
                    commit(LOADING, true)
                    let response = await Request({
                        baseUrl: process.env.VUE_APP_BASE_URL,
                        path: `/purchase_status?where=${state.filter.query()}`
                    })
                    commit(ITEMS, response.data.data)
                }
                else {
                    commit(ITEMS, [])
                }
            }
            catch (e) {
                console.error('error on get', e)
            }
            finally {
                commit(LOADING, false)
            }
        },

        handleSetSelectedItem({commit}, payload) {
            commit(SELECTED_ITEM, payload.item)
        }
    }
}