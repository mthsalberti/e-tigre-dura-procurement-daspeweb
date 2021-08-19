<template>
  <div class="mb-5">
    <v-card-title v-text="$t('items')"/>
    <v-row align="center">
      <v-col md="3" sm="12">
        <v-text-field hide-details :label="$t('description')" solo />
      </v-col>
      <v-col md="1" sm="12">
        <v-text-field hide-details :label="$t('quantity')" solo />
      </v-col>
      <v-col md="1" sm="12">
        <v-text-field hide-details :label="$t('unit')" solo />
      </v-col>
      <v-col md="1" sm="12">
        <v-text-field hide-details :label="$t('unitCost')" solo />
      </v-col>
      <v-col md="2" sm="12">
        <v-text-field hide-details :label="$t('totalCost')" solo />
      </v-col>
      <v-col md="3" sm="12">
        <v-autocomplete
            cache-items solo hide-no-data hide-details
            :label="$t('department')"
            :no-data-text="$t('noInformation')"
        />
      </v-col>
      <v-col md="1" sm="12">
        <v-btn outlined color="#fff">
          <v-icon v-text="'delete'" color="grey"/>
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="grey" class="ma-5 mb-3" fab small outlined >
      <v-icon v-text="'add'" color="grey"/>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ListViewPurchaseItem"
}
</script>

<style scoped>

</style>