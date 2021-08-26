<template>
  <filling :title="$t($route.path)">
    <v-data-table
        :loading-text="$t('loadingItems')"
        :loading="isLoading"
        :headers="headers"
        :items="items"
        item-key="id"
        hide-default-footer
    >
      <template v-slot:top>
        <component :is="componentFilter"/>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small color="primary" v-on="on" v-bind="attrs" @click="handleClickShareAction(item)">reply</v-icon>
          </template>
          <span v-text="$t('share')"/>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small color="primary" v-on="on" v-bind="attrs" @click="handleClickEditAction(item)">edit</v-icon>
          </template>
          <span v-text="$t('edit')"/>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small color="primary" v-on="on" v-bind="attrs" @click="handleClickDeleteAction(item)">delete</v-icon>
          </template>
          <span v-text="$t('delete')"/>
        </v-tooltip>
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
import {routeConf} from "@/router";

export default {
  name: "ListViewPurchase",
  components: {
    filling,
    FilterPurchase,
  },
  watch: {
    $route() {
      this.setup()
    }
  },
  mounted() {
    this.setup()
  },
  data() {
    return {
      headers: [] /*{text, value}*/,
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
      },
    }),
  },
  methods: {
    async setup() {
      try {
        // await this.clearState()
        await this.handleGetData()
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
      },
      removeItem(dispatch, payload) {
        return dispatch(this.getPathStore('removeItem'), payload)
      }
    }),
    getPathStore(propName) {
      return `${this.path}Store/${propName}`
    },

    /* only to build layout */
    handleClickShareAction() {
    },
    handleClickEditAction(item) {
      this.$router.push({
        path: `${routeConf.requestPath}view/${item.id}`
      })
    },
    async handleClickDeleteAction(item) {
      await this.removeItem({id: item.id})
      this.handleGetData()
    },
  }
}
</script>

<style scoped>

</style>