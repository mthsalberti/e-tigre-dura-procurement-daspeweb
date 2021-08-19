<template>
  <filling :title="$t($route.path)">
    <v-data-table :headers="headers" :items="items" hide-default-footer>
      <template v-slot:top>
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
            <v-select :label="$t('vendor')" solo hide-details :no-data-text="$t('noInformation')"/>
          </v-col>
          <v-col md="2" sm="12">
            <v-select :label="$t('department')" solo hide-details :no-data-text="$t('noInformation')"/>
          </v-col>
          <v-col md="2" sm="12">
            <v-select :label="$t('status')" solo hide-details :no-data-text="$t('noInformation')"/>
          </v-col>
          <v-col md="1" sm="12">
            <v-btn class="py-5" depressed small color="secondary" @click="handleClickToFilter">
              <v-icon v-text="'search'" color="#fff"/>
            </v-btn>
          </v-col>
        </v-row>
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

export default {
  name: "ListViewPurchase",
  data() {
    return {
      headers: Array /*{text, value, divider}*/,
      fields: Array,
      key: String,
      items: Array,
      linkActionButton: null
    }
  },
  components: {
    filling
  },
  methods: {
    handleClickShareAction(){},
    handleClickEditAction(){},
    handleClickDeleteAction(){},
    handleClickToFilter(){}
  }
}
</script>

<style scoped>

</style>