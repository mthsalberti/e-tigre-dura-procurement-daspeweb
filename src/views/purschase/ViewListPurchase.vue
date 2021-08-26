<script>
import ListViewPurchase from "@/components/lists/ListViewPurchase";
import {routeConf} from "@/router";
import FilterPurchase from "@/components/filters/FilterPurchase";

export default {
  name: "ViewListPurchase",
  extends: ListViewPurchase,
  created() {
  },
  data(){
    return {
      headers: [
        {
          text: this.$t('request'),
          value: 'id'
        },
        {
          text: this.$t('vendor'),
          value: 'vendor_name'
        },
        {
          text: this.$t('department'),
          value: 'created_by_department_description'
        },
        {
          text: `${this.$t('requestedAt')}?`,
          value: 'created_at'
        },
        {
          text: this.$t('status'),
          value: 'status_description'
        },
        {
          text: this.$t('order'),
          value: 'order_id'
        },
        {
          text: this.$t('value'),
          value: 'total_cost'
        },
        {
          text: this.$t('actions'),
          sortable: false,
          value: 'actions',
        },
      ],
      linkActionButton: {
        path: `${routeConf.requestPath}view/new`
      },
      path: 'purchase',
      componentFilter: FilterPurchase
    }
  }
}
</script>