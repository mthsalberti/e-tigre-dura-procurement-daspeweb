<template>
  <v-form :disabled="disabled">
    <v-row align="center">
      <v-col md="3" sm="12">
        <v-text-field hide-details :label="$t('description')" solo v-model="item.description"/>
      </v-col>
      <v-col md="1" sm="12">
        <v-text-field hide-details :label="$t('quantity')" solo v-model="item.quantity"/>
      </v-col>
      <v-col md="1" sm="12">
        <v-text-field hide-details :label="$t('unit')" solo v-model="item.unit_of_measurement"/>
      </v-col>
      <v-col md="1" sm="12">
        <v-text-field hide-details :label="$t('unitCost')" solo v-model="item.unit_cost"/>
      </v-col>
      <v-col md="2" sm="12">
        <v-text-field hide-details :label="$t('totalCost')" solo v-model="item.total_cost"/>
      </v-col>
      <v-col md="3" sm="12">
        <select-field :label="$t('department')" store-path="department" />
      </v-col>
      <v-col md="1" sm="12">
        <v-btn outlined color="#fff" @click="handleClickToRemovePurchaseItem">
          <v-icon v-text="'delete'" color="grey"/>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import SelectField from "@/components/fields/SelectField";
export default {
  name: "view-purchase-item",
  components: {
    SelectField
  },
  props: {
    item: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    handleClickToRemovePurchaseItem(){
      this.$emit('removePurchaseItem', this.item)
    }
  }
}
</script>