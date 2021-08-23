<template>
  <v-autocomplete
      cache-items solo hide-no-data hide-details
      :label="$t('vendor')"
      :no-data-text="$t('noInformation')"
  />
</template>

<script>
export default {
  name: "select-vendor"
}
</script>

<style scoped>

</style>