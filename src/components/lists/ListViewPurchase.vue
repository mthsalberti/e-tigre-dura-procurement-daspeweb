<template>
  <filling :title="$t($route.path)">
    <v-data-table
        :loading-text="$t('loadingItems')"
        :loading="isLoading"
        :headers="headers"
        :items="items"
        hide-default-footer
    >
      <template v-slot:top>
        <component :is="componentFilter"/>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon v-text="'reply'" small class="mr-2" @click="handleClickShareAction(item)"/>
        <v-icon v-text="'edit'" small class="mr-2" @click="handleClickEditAction(item)"/>
        <v-icon v-text="'delete'" small class="mr-2" @click="handleClickDeleteAction(item)"/>
      </template>
      <template v-slot:no-data>
        {{ $t('noItems') }}
      </template>
    </v-data-table>
    <v-btn
        v-if="linkActionButton"
        color="success"
        class="mb-10 mr-5"
        absolute bottom right fab small outlined
        :to="linkActionButton"
    >
      <v-icon v-text="'add'" color="success"/>
    </v-btn>
  </filling>
</template>

<script>
import filling from "@/components/app/filling";
import {mapActions, mapState} from 'vuex'
import FilterPurchase from "@/components/filters/FilterPurchase";

export default {
  name: "ListViewPurchase",
  components: {
    filling,
    FilterPurchase,
  },
  updated() {
    // this.setup()
  },
  watch: {
    $route () {
      this.setup()
    }
  },
  mounted() {
    this.setup()
  },
  data() {
    return {
      headers: Array /*{text, value, divider}*/,
      fields: Array,
      key: String,
      linkActionButton: null,
      path: String,
      componentFilter: Object
    }
  },
  computed: {
    ...mapState({
      items(_, getters) {
        return getters[this.getPathStore('getItems')]
      },
      isLoading(_, getters) {
        return getters[this.getPathStore('getLoading')]
      }
    }),
  },
  methods: {
    async setup(){
      try {
        await this.clearState()
        this.handleGetData()
      } catch (e) {
        console.error('ERROR ON MOUNT ListViewPurchase', e)
      }
    },
    ...mapActions({
      clearState(dispatch) {
        return dispatch(this.getPathStore('clearState'))
      },
      handleGetData(dispatch) {
        return dispatch(this.getPathStore('handleGetData'))
      }
    }),
    getPathStore(propName) {
      return `${this.path}Store/${propName}`
    },

    /* only to build layout */
    handleClickShareAction() {
    },
    handleClickEditAction() {
    },
    handleClickDeleteAction() {
    },
  }
}
</script>

<style scoped>

</style>