<template>
  <div>
    <label v-text="label"/>
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
        :disabled="disabled"
        :required="required"
        :rules="mainRules"
    />
  </div>
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
      default: () => 'description'
    },
    itemValue: {
      default: () => 'id'
    },
    sendToStore: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    initialValue: {
      type: Object,
      required: false,
      default: () => null
    },
    required: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data() {
    return {
      term: '',
      timer: null,
      selected: null,
      searchEnabled: false
    }
  },
  watch: {
    selected(item){
      if (this.sendToStore) {
        this.handleSetSelectedItem({item})
      }
      else {
        this.$emit('select-item', item)
      }
    }
  },
  computed: {
    ...mapState({
      items(_, getters) {
        return getters[this.getPathStore('getItems')]
      },
      isLoading(_, getters) {
        return getters[this.getPathStore('getLoading')]
      },
      selectedItem(_, getters) {
        return getters[this.getPathStore('getSelectedItem')]
      },
    }),
    mainRules(){
      return [
        v => (!!v && this.required) || this.$t('fieldRequired')
      ]
    }
  },
  mounted() {
    this.setup()
  },
  methods: {
    setup() {
      if (this.sendToStore) {
        this.selected = this.selectedItem
      }
      else if (this.initialValue && this.initialValue.id !== null) {
        this.selected = this.initialValue
        this.items.push(this.initialValue)
      }
      this.$watch('term', function(value){
        if (this.searchEnabled) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.handleSearch({value})
          }, 500)
        }

        this.searchEnabled = true
      })
    },
    getPathStore(propName) {
      return `${this.storePath}Store/${propName}`
    },
    ...mapActions({
      handleSearch(dispatch, payload) {
        return dispatch(this.getPathStore('handleSearch'), payload)
      },
      handleSetSelectedItem(dispatch, payload) {
        return dispatch(this.getPathStore('handleSetSelectedItem'), payload)
      },
    }),
  }
}
</script>