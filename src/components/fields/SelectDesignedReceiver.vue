<template>
  <v-autocomplete
      cache-items solo hide-no-data hide-details
      :label="$t('designedReceiver')"
      :no-data-text="$t('noInformation')"
  />
</template>

<script>
export default {
  name: "select-designed-receiver"
}
</script>

<style scoped>

</style>