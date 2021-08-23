<template>
  <v-autocomplete
      :label="label"
      cache-items
      solo
      hide-no-data
      hide-details
      :no-data-text="$t('noInformation')"
      v-model="selected"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :search-input.sync="term"
      :loading="isLoading"
      return-object
  />
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "select-field",
  props: {
    debounce: {
      type: Number,
      default: () => 500
    },
    label: {
      type: String,
      required: true
    },
    storePath: {
      type: String,
      required: true
    },
    itemText: {
      type: String,
      default: () => 'description'
    },
    itemValue: {
      type: String,
      default: () => 'id'
    }
  },
  data(){
    return {
      term: null,
      timer: null,
      selected: null
    }
  },
  watch: {
    term(value){
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.handleSearch({value}), this.debounce)
    },
    selected(item){
      this.$emit('select-item', item)
    }
  },
  computed: {
    ...mapState({
      items(_, getters){
        return getters[this.getPathStore('getItems')]
      },
      isLoading(_, getters){
        return getters[this.getPathStore('getLoading')]
      },
      selectedItem(_, getters){
        return getters[this.getPathStore('getSelectedItem')]
      },
    }),
  },
  methods: {
    setup(){
      this.selected = this.selectedItem
    },
    getPathStore(propName) {
      return `${this.storePath}Store/${propName}`
    },
    ...mapActions({
      handleSearch(dispatch, payload){
        return dispatch(this.getPathStore('handleSearch'), payload)
      }
    }),
  }
}
</script>