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
      <select-field :label="$t('vendor')" store-path="vendor" item-text="name"/>
    </v-col>
    <v-col md="2" sm="12">
      <select-field :label="$t('department')" store-path="department"/>
    </v-col>
    <v-col md="2" sm="12">
      <select-field :label="$t('status')" store-path="purchaseStatus"/>
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

export default {
  name: "FilterPurchase",
  components: {
    SelectField
  },
  methods: {
    handleClickToFilter(){}
  }
}
</script>

<style scoped>

</style>