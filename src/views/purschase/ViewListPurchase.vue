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
          value: 'vendor'
        },
        {
          text: this.$t('department'),
          value: 'requested_by_department'
        },
        {
          text: `${this.$t('requestedAt')}?`,
          value: 'requested_at'
        },
        {
          text: this.$t('status'),
          value: 'status_id'
        },
        {
          text: this.$t('order'),
          value: 'parent_id'
        },
        {
          text: this.$t('value'),
          value: 'total_cost'
        },
      ],
      linkActionButton: {
        path: `${routeConf.requestPath}new/items`
      },
      path: 'purchase',
      componentFilter: FilterPurchase
    }
  }
}
</script>