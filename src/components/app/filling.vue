<template>
  <div>
    <v-card-title v-text="title" class="text-h4"/>
    <v-card-subtitle v-text="subtitle" v-if="subtitle"/>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "filling",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>

</style>