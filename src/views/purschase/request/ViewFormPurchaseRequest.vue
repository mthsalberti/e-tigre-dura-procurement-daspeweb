<template>
  <filling :title="$t('purchaseRequest')" :subtitle="$t('add')">
    <v-form ref="formPurchaseRequest" v-if="!(isLoadingHere || isLoading)">
      <!--      :search-input.sync="search"-->
      <v-row>
        <!--first row-->
        <v-col md="3" sm="12">
          <select-field required :label="$t('vendor')" store-path="vendor" item-text="name"
                        :initial-value="{id: purchase.vendor_id, name: purchase.vendor_name}" @select-item="handleChangeSelectVendor"/>
        </v-col>
        <v-col md="9" sm="12"/>

        <!--second row-->
        <v-col md="3" sm="12">
          <select-field required :initial-value="{id: purchase.designated_receiver_id, name: purchase.designated_receiver_name}" :label="$t('designedReceiver')" store-path="user" item-text="name" @select-item="handleChangeDesignedReceiver"/>
        </v-col>
        <v-col md="9" sm="12"/>

        <!--third row-->
        <v-col lg="3" sm="12">
          <select-field required :initial-value="{id: purchase.requested_by, name: purchase.requested_by_name}" :label="$t('requestedBy')"
                        store-path="user" item-text="name"
                        @select-item="handleChangeRequestedBy"/>
        </v-col>
        <v-col lg="3" sm="12">
          <select-field required :initial-value="{id: purchase.requested_by_department, description: purchase.department_requested_by_description}" :label="$t('department')"
                        store-path="department"
                        @select-item="handleChangeRequestedByDepartment"/>
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
              <label v-text="$t('deliveryForecast')"/>
              <v-text-field
                  v-model="purchase.delivery_forecast"
                  readonly
                  solo
                  required
                  hide-details
                  v-bind="attrs"
                  v-on="on"
              />
            </template>
            <v-date-picker v-model="purchase.delivery_forecast" color="primary" :locale="$t('BCP47LanguageTag')"/>
          </v-menu>
        </v-col>
        <v-col md="9" sm="12"/>

        <!--fifth row-->
        <v-col md="3" sm="12">
          <select-field required :label="$t('status')" :initial-value="{id: purchase.status_id, description: purchase.status_description}" store-path="purchaseStatus" @select-item="handleChangeStatus"/>
        </v-col>
        <v-col md="9" sm="12"/>

        <!--sixth row-->
        <v-col lg="3" sm="12">
          <select-field required :label="$t('createdBy')" store-path="user" :initial-value="{id: purchase.createdBy, name: purchase.created_by_name}"
                        item-text="name" @select-item="handleChangeCreatedBy"/>
        </v-col>
        <v-col lg="3" sm="12">
          <select-field required :label="$t('department')" store-path="department"
                        :initial-value="{id: purchase.created_by_department, description: purchase.department_created_by_description}"
                        @select-item="handleChangeCreatedByDepartment"/>
        </v-col>
        <v-col md="6" sm="12"/>

        <!--seventh row-->
        <v-col md="3" sm="12">
          <label v-text="$t('totalCost')"/>
          <v-text-field type="number" prefix="$" readonly hide-details solo
                        v-model="purchase.total_cost"/>
        </v-col>
        <v-col md="9" sm="12"/>
      </v-row>

      <!--view of items-->
      <router-view ref="purchaseItemsChild"/>

      <buttons-action-form
          class="pl-md-3 pb-md-3"
          :save-label="$t('saveDraft')"
          :cancel-label="$t('cancel')"
          hide-reject-button
          @click-save="handleClickSavePurchaseAsDraft"
          @click-cancel="handleClickCancelPurchase"
      >
        <v-btn class="mr-md-2" v-text="$t('sendToOrder')" color="info" @click="handleClickSendPurchaseToOrder"/>
      </buttons-action-form>
    </v-form>
    <div v-else class="text-center">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-dialog v-model="dialog.active" width="500">
      <v-card>
        <v-card-title class="text-h5 primary white--text" v-text="dialog.title"/>
        <v-card-text v-text="dialog.message" class="mt-5"/>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = {active: false}" v-text="'Ok'"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </filling>
</template>

<script>
import filling from "@/components/app/filling";
import SelectField from "@/components/fields/SelectField";
import ButtonsActionForm from "@/components/buttons/ButtonsActionForm";
import {mapActions, mapState} from 'vuex'
import {routeConf} from "@/router";

export default {
  name: "ViewFormPurchaseRequest",
  data() {
    return {
      isLoadingHere: false,
      purchase: {
        total_cost: null,
        vendor_id: null,
        designated_receiver_id: null,
        requested_by: null,
        delivery_forecast: null,
        requested_by_department: null,
        status_id: null,
        createdBy: null,
        created_by_department: null,
        vendor_name: null,
        status_description: null,
        department_requested_by_description: null,
        department_created_by_description: null,
        requested_by_name: null,
        created_by_name: null,
        designated_receiver_name: null,
      },
      readOnlyForm: false,
      dialog: {
        active: false,
      },
      formAlert: {
        active: true,
        title: this.$t('warning'),
        message: this.$t('fillAllFields'),
      },
      purchaseItemsAlert: {
        active: true,
        title: this.$t('warning'),
        message: this.$t('unlessOneItem'),
      },
      fieldsToRemove: [
        'vendor',
        'designed_receiver',
        'requested_by_user',
        'department',
        'status',
        'created_by_user',
        'vendor_name',
        'status_description',
        'department_requested_by_description',
        'department_created_by_description',
        'requested_by_name',
        'created_by_name',
        'designated_receiver_name',
        'department_description'
      ]
    }
  },
  components: {
    filling,
    SelectField,
    ButtonsActionForm
  },
  watch: {
    $route() {
      this.setup()
    },
    purchaseItems: {
      deep: true,
      handler: function (items) {
        this.purchase.total_cost = items.reduce((t, pi) => {
          t += pi.total_cost ? parseFloat(pi.total_cost) : 0
          return t
        }, 0)
      }
    }
  },
  mounted() {
    this.setup()
  },
  computed: {
    ...mapState({
      purchaseItems(_, getters) {
        return getters['purchaseItemStore/getItems']
      },
      isLoading(_, getters) {
        return getters['purchaseStore/getLoading']
      }
    }),
  },
  methods: {
    async setup() {
      let id = this.$route.params.id
      if (id) {
        this.isLoadingHere = true
        this.purchase = {...this.purchase, ...await this.handleGetItem({id})}
        console.log("this.purchase", this.purchase)
        this.readOnlyForm = true
        this.isLoadingHere = false
      }
    },
    ...mapActions({
      addItem(dispatch, payload) {
        return dispatch('purchaseStore/addItem', payload)
      },
      handleGetItem(dispatch, payload) {
        return dispatch('purchaseStore/handleGetItem', payload)
      },
      addPurchaseItems(dispatch, payload) {
        return dispatch('purchaseItemStore/handleAddItems', payload)
      }
    }),
    treatPurchaseToUpsert() {
      return Object.keys(this.purchase).reduce((ptu, k) => {
        if (!this.fieldsToRemove.includes(k)) ptu[k] = this.purchase[k]
        return ptu
      }, {})
    },
    async handleClickSavePurchaseAsDraft() {
      try {
        let isValid = await this.$refs.formPurchaseRequest.validate()
        let purchaseItemsChildIsValid = await this.$refs.purchaseItemsChild.validate()
        if (!isValid || !purchaseItemsChildIsValid) {
          this.dialog = this.formAlert
        } else if (!this.purchaseItems.length) {
          this.dialog = this.purchaseItemsAlert
        } else {
          let purchaseToUpsert = await this.treatPurchaseToUpsert()
          let idInsertedPurchase = await this.addItem({item: purchaseToUpsert})
          if (idInsertedPurchase === 0) idInsertedPurchase = purchaseToUpsert.id
          await this.addPurchaseItems({
            items: this.purchaseItems.map(e => {
              e['purchase_id'] = idInsertedPurchase
              return e
            })
          })
          console.log(routeConf)
          // await this.$router.replace({
          //   path: `${routeConf.requestPath}view/${idInsertedPurchase}`,
          // })
          await this.$router.replace({
            path: `/`,
          })
        }
      } catch (e) {
        console.error('ERROR handleClickSavePurchaseAsDraft: ', e)
      }
    },
    handleClickCancelPurchase() {
      this.$router.back()
    },
    handleClickSendPurchaseToOrder() {
      console.log('on handleClickSendPurchaseToOrder')
    },
    handleChangeSelectVendor(item) {
      this.purchase.vendor_id = item.id
    },
    handleChangeDesignedReceiver(item) {
      this.purchase.designated_receiver_id = item.id
    },
    handleChangeRequestedBy(item) {
      this.purchase.requested_by = item.id
    },
    handleChangeRequestedByDepartment(item) {
      this.purchase.requested_by_department = item.id
    },
    handleChangeStatus(item) {
      console.log('item', item)
      this.purchase.status_id = item.id
    },
    handleChangeCreatedBy(item) {
      this.purchase.createdBy = item.id
    },
    handleChangeCreatedByDepartment(item) {
      this.purchase.created_by_department = item.id
    },
  }
}
</script>
