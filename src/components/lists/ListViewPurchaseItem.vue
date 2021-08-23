<template>
  <div class="my-5" :class="isLoading ? 'text-center' : ''">
    <v-progress-circular indeterminate color="primary" v-if="isLoading"/>
    <div v-else>
      <v-card-title v-text="$t('items')"/>
      <div v-if="items && items.length">
        <view-purchase-item
            v-for="(pi, i) in items"
            :key="`purchase-item-${pi.id}-${i}`"
            :item="pi"
            @removePurchaseItem="handleClickRemovePurchaseItem"
        />
      </div>
      <v-list-item-subtitle class="text-center" v-text="$t('noPurchaseItems')" v-else/>
      <v-btn color="grey" class="ma-5 mb-3" fab small outlined @click="handleClickAddPurchaseItem">
        <v-icon v-text="'add'" color="grey"/>
      </v-btn>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ViewPurchaseItem from "@/views/purchaseItem/ViewPurchaseItem";

export default {
  name: "list-view-purchase-item",
  components: {
    ViewPurchaseItem
  },
  mounted() {
    this.setup()
  },
  data() {
    return {
      path: String
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
    })
  },
  methods: {
    async setup() {
      await this.clearState()
      this.handleGetData()
    },
    ...mapActions({
      handleGetData(dispatch, payload) {
        return dispatch(this.getPathStore('handleGetData'), payload)
      },
      clearState(dispatch, payload) {
        return dispatch(this.getPathStore('clearState'), payload)
      },
      handleAddItem(dispatch, payload) {
        return dispatch(this.getPathStore('handleAddItem'), payload)
      },
      handleRemoveItem(dispatch, payload) {
        return dispatch(this.getPathStore('handleRemoveItem'), payload)
      }
    }),
    getPathStore(propName) {
      return `${this.path}Store/${propName}`
    },
    handleClickAddPurchaseItem() {
      this.handleAddItem({item: {id: 'show'}})
    },
    handleClickRemovePurchaseItem(item) {
      this.handleRemoveItem({item})
    }
  }
}
</script>

<style scoped>

</style>