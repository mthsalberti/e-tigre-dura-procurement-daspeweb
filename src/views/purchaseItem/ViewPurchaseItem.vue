<template>
  <v-form ref="formPurchaseItem" :disabled="disabled">
    <v-row align="center">
      <v-col md="3" sm="12">
        <label v-text="$t('description')"/>
        <v-text-field hide-details solo v-model="item.description" required/>
      </v-col>
      <v-col md="1" sm="12">
        <label v-text="$t('quantity')"/>
        <v-text-field hide-details type="number" solo v-model="item.quantity" required/>
      </v-col>
      <v-col md="1" sm="12">
        <label v-text="$t('unit')"/>
        <v-text-field hide-details solo v-model="item.unit_of_measurement" required/>
      </v-col>
      <v-col md="1" sm="12">
        <label v-text="$t('unitCost')"/>
        <v-text-field hide-details type="number" solo v-model="item.unit_cost" required/>
      </v-col>
      <v-col md="2" sm="12">
        <label v-text="$t('totalCost')"/>
        <v-text-field hide-details type="number" solo v-model="item.total_cost" required readonly/>
      </v-col>
      <v-col md="3" sm="12">
        <select-field :label="$t('department')" item-text="description" store-path="department" @select-item="handleChangeDepartment" :initial-value="{id: item.department_id, description: item.department_description}" required/>
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
  mounted() {
    this.setup()
  },
  methods: {
    setup(){
      this.$watch('item.quantity', function(newValue) {
        this.item.total_cost = (newValue * this.item.unit_cost)
      })
      this.$watch('item.unit_cost', function(newValue) {
        this.item.total_cost = (newValue * this.item.quantity)
      })
    },
    handleClickToRemovePurchaseItem(){
      this.$emit('removePurchaseItem', this.item)
    },
    handleChangeDepartment(department){
      this.$emit('change-department', {
        item: this.item,
        department
      })
    }
  }
}
</script>