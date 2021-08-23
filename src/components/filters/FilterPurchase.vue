<template>
  <v-row align="center">
    <v-col md="1" sm="12">
      <div class="text-caption" v-text="$t('filters')"/>
    </v-col>
    <v-col md="2" sm="12">
      <v-text-field :placeholder="$t('purchase')" solo hide-details/>
    </v-col>
    <v-col md="2" sm="12">
      <v-text-field :placeholder="$t('orderNumber')" solo hide-details/>
    </v-col>
    <v-col md="2" sm="12">
      <select-vendor/>
    </v-col>
    <v-col md="2" sm="12">
      <select-department/>
    </v-col>
    <v-col md="2" sm="12">
      <select-purchase-status/>
    </v-col>
    <v-col md="1" sm="12">
      <v-btn class="py-5" depressed small color="secondary" @click="handleClickToFilter">
        <v-icon v-text="'search'" color="#fff"/>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import SelectVendor from "@/components/fields/SelectVendor";
import SelectDepartment from "@/components/fields/SelectDepartment";
import SelectPurchaseStatus from "@/components/fields/SelectPurchaseStatus";

export default {
  name: "FilterPurchase",
  components: {
    SelectVendor,
    SelectDepartment,
    SelectPurchaseStatus
  },
  methods: {
    handleClickToFilter(){}
  }
}
</script>

<style scoped>

</style>