<template>
  <filling :title="$t('purchaseRequest')" :subtitle="$t('add')">
    <v-form ref="formPurchaseRequest">
<!--      :search-input.sync="search"-->
      <v-row>
        <!--first row-->
        <v-col md="3" sm="12">
          <v-autocomplete
              cache-items solo hide-no-data hide-details
              :label="$t('vendor')"
              :no-data-text="$t('noInformation')"
          />
        </v-col>
        <v-col md="9" sm="12" />

        <!--second row-->
        <v-col md="3" sm="12">
          <v-autocomplete
              cache-items solo hide-no-data hide-details
              :label="$t('designedReceiver')"
              :no-data-text="$t('noInformation')"
          />
        </v-col>
        <v-col md="9" sm="12"/>

        <!--third row-->
        <v-col lg="3" sm="12">
          <v-autocomplete
              cache-items solo hide-no-data hide-details
              :label="$t('requestedBy')"
              :no-data-text="$t('noInformation')"
          />
        </v-col>
        <v-col lg="3" sm="12">
          <v-autocomplete
              cache-items solo hide-no-data hide-details
              :label="$t('department')"
              :no-data-text="$t('noInformation')"
          />
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

      <v-row class="pl-md-3 pb-md-3">
        <v-btn class="mr-md-2" v-text="$t('sendToOrder')" color="info"/>
        <v-btn class="mr-md-2" v-text="$t('saveDraft')" color="success"/>
        <v-btn class="mr-md-2" v-text="$t('cancel')" color="warning" outlined @click="() => $router.go(-1)"/>
      </v-row>
    </v-form>
  </filling>
</template>

<script>
import filling from "@/components/app/filling";

export default {
  name: "ViewFormPurchaseRequest",
  data(){
    return {
      deliveryForecastValue: ''
    }
  },
  components: {
    filling
  }
}
</script>

<style scoped>

</style>