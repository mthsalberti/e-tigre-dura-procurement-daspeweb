<template>
  <filling :title="$t('purchaseRequest')" :subtitle="$t('add')">
    <v-form ref="formPurchaseRequest">
<!--      :search-input.sync="search"-->
      <v-row>
        <!--first row-->
        <v-col md="3" sm="12">
          <select-field :label="$t('vendor')" store-path="vendor"/>
        </v-col>
        <v-col md="9" sm="12" />

        <!--second row-->
        <v-col md="3" sm="12">
          <select-field :label="$t('designedReceiver')" store-path="user" item-text="name"/>
        </v-col>
        <v-col md="9" sm="12"/>

        <!--third row-->
        <v-col lg="3" sm="12">
          <select-field :label="$t('requestedBy')" store-path="user" item-text="name"/>
        </v-col>
        <v-col lg="3" sm="12">
          <select-field :label="$t('department')" store-path="department"/>
        </v-col>
        <v-col md="6" sm="12"/>

        <!--fourth row-->
        <v-col md="3" sm="12">
          <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              bottom
              transition="slide-y-transition"
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="deliveryForecastValue"
                  :label="$t('deliveryForecast')"
                  readonly
                  solo
                  hide-details
                  v-bind="attrs"
                  v-on="on"
              />
            </template>
            <v-date-picker v-model="deliveryForecastValue" color="primary" :locale="$t('BCP47LanguageTag')" />
          </v-menu>
        </v-col>
        <v-col md="9" sm="12"/>

        <!--fifth row-->
        <v-col md="3" sm="12">
          <v-text-field solo :label="$t('status')" disabled hide-details/>
        </v-col>
        <v-col md="9" sm="12"/>

        <!--sixth row-->
        <v-col lg="3" sm="12">
          <v-text-field solo :label="$t('createdBy')" disabled hide-details/>
        </v-col>
        <v-col lg="3" sm="12">
          <v-text-field solo :label="$t('department')" disabled hide-details/>
        </v-col>
        <v-col md="6" sm="12"/>

        <!--seventh row-->
        <v-col md="3" sm="12">
          <v-text-field :label="$t('totalCost')" prefix="$" readonly hide-details solo />
        </v-col>
        <v-col md="9" sm="12"/>
      </v-row>

      <!--view of items-->
      <router-view />

      <buttons-action-form
        class="pl-md-3 pb-md-3"
        :save-label="$t('saveDraft')"
        :cancel-label="$t('cancel')"
        hide-reject-button
        @clickSave="handleClickSavePurchaseAsDraft"
        @clickCancel="handleClickCancelPurchase"
      >
        <v-btn class="mr-md-2" v-text="$t('sendToOrder')" color="info" @click="handleClickSendPurchaseToOrder"/>
      </buttons-action-form>
    </v-form>
  </filling>
</template>

<script>
import filling from "@/components/app/filling";
import SelectField from "@/components/fields/SelectField";
import ButtonsActionForm from "@/components/buttons/ButtonsActionForm";

export default {
  name: "ViewFormPurchaseRequest",
  components: {
    filling,
    SelectField,
    ButtonsActionForm
  },
  data(){
    return {
      deliveryForecastValue: ''
    }
  },
  methods: {
    handleClickSavePurchaseAsDraft(){
      console.log('tá na handleClickSavePurchaseAsDraft')
    },
    handleClickCancelPurchase(){
      this.$router.back()
    },
    handleClickSendPurchaseToOrder(){
      console.log('tá na handleClickSendPurchaseToOrder')
    }
  }
}
</script>

<style scoped>

</style>