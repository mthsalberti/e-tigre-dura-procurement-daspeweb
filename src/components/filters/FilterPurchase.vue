<template>
  <v-row align="center">
    <v-col md="1" sm="12">
      <div class="text-caption" v-text="$t('filters')"/>
    </v-col>
    <v-col md="2" sm="12">
      <v-text-field :placeholder="$t('purchase')" solo hide-details v-model="purchase"/>
    </v-col>
    <v-col md="2" sm="12">
      <v-text-field :placeholder="$t('orderNumber')" solo hide-details v-model="orderNumber"/>
    </v-col>
    <v-col md="2" sm="12">
      <select-field :label="$t('vendor')" store-path="vendor" item-text="name" send-to-store/>
    </v-col>
    <v-col md="2" sm="12">
      <select-field :label="$t('department')" store-path="department" send-to-store/>
    </v-col>
    <v-col md="2" sm="12">
      <select-field :label="$t('status')" store-path="purchaseStatus" send-to-store/>
    </v-col>
    <v-col md="1" sm="12">
      <v-btn class="py-5" depressed small color="secondary" @click="handleClickToFilter">
        <v-icon v-text="'search'" color="#fff"/>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import SelectField from "@/components/fields/SelectField";
import {mapState, mapActions} from 'vuex'

export default {
  name: "FilterPurchase",
  components: {
    SelectField
  },
  data(){
    return {
      purchase: '',
      orderNumber: ''
    }
  },
  computed: {
    ...mapState({
      vendor(_, getters) {
        return getters['vendorStore/getSelectedItem']
      },
      department(_, getters) {
        return getters['departmentStore/getSelectedItem']
      },
      status(_, getters) {
        return getters['purchaseStatusStore/getSelectedItem']
      }
    }),
    filter(){
      return [
        {
          name: 'purchase',
          field: 'id',
          operator: 'LIKE',
          value: `%${this.purchase}%`
        },
        {
          name: 'orderNumber',
          field: 'parent_id',
          operator: 'LIKE',
          value: `%${this.orderNumber}%`
        },
        {
          name: 'vendor',
          field: 'vendor_id',
          operator: '=',
          value: this.vendor.id
        },
        {
          //there is not this field
          name: 'department',
          field: 'department_id',
          operator: '=',
          value: this.department.id
        },
        {
          name: 'status',
          field: 'status_id',
          operator: '=',
          value: this.status.id
        },
      ]
        .filter(f => f.value !== null && f.value !== undefined && f.value !== '')
    }
  },
  methods: {
    ...mapActions({
      overrideFilter(dispatch, payload){
        return dispatch('purchaseStore/overrideFilter', payload)
      },
      handleGetData(dispatch){
        return dispatch('purchaseStore/handleGetData')
      },
    }),
    async handleClickToFilter(){
      try {
        await this.overrideFilter({filter: this.filter})
        await this.handleGetData()
      }
      catch (e) {
        console.error('ERROR o try filter', e)
      }
    }
  }
}
</script>