<template>
  <div class="my-5" :class="isLoading ? 'text-center' : ''">
    <v-progress-circular indeterminate color="primary" v-if="isLoading"/>
    <div v-else>
      <v-card-title v-text="$t('items')"/>
      <div v-if="items && items.length">
        <view-purchase-item
            ref="purchaseItemRef"
            v-for="(pi, i) in items"
            :key="`purchase-item-${pi}-${i}`"
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
      path: String,
      purchaseId: null
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
      this.purchaseId = this.$route.params.id
      console.log('this.pruchaseId', this.purchaseId)
      await this.clearState()
      if (this.purchaseId) {
        this.handleGetData({purchaseId: this.purchaseId})
      }
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
      this.handleAddItem({item: {
          description: null,
          quantity: null,
          unit_of_measurement: null,
          unit_cost: null,
          total_cost: null,
        }})
    },
    handleClickRemovePurchaseItem(item) {
      this.handleRemoveItem({item})
    },
    async validate(){
      let isValid = true;
      let itemsForm = this.$refs.purchaseItemRef ?? []
      for (let i = 0; i < itemsForm.length; i++) {
        isValid = await itemsForm[i].$refs.formPurchaseItem.validate()
        if (!isValid) break
      }
      return isValid
    }
  }
}
</script>
