<template>
  <v-autocomplete
      cache-items solo hide-no-data hide-details
      :label="label"
      :no-data-text="$t('noInformation')"
  />
</template>

<script>
export default {
  name: "select-user",
  props: {
    label: String
  }
}
</script>

<style scoped>

</style>