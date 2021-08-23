<template>
  <v-row>
    <slot/>
    <v-btn class="mr-md-2" v-text="saveLabel" color="success" @click="defaultMethod('Save')" v-if="!hideSaveButton"/>
    <v-btn class="mr-md-2" v-text="rejectLabel" color="error" outlined @click="defaultMethod('Reject')" v-if="!hideRejectButton"/>
    <v-btn class="mr-md-2" v-text="cancelLabel" color="warning" outlined @click="defaultMethod('Cancel')" v-if="!hideCancelButton"/>
  </v-row>
</template>
<script>
export default {
  name: "buttons-action-form",
  props: {
    saveLabel: {
      type: String
    },
    hideSaveButton: {
      type: Boolean,
      default: () => false
    },
    rejectLabel: {
      type: String
    },
    hideRejectButton: {
      type: Boolean,
      default: () => false
    },
    cancelLabel: {
      type: String
    },
    hideCancelButton: {
      type: Boolean,
      default: () => false
    },
  },
  methods: {
    defaultMethod(methodName) {
      this.$emit(`click${methodName}`)
    }
  },
}
</script>
