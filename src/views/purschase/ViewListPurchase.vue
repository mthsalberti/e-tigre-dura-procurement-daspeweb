<script>
import ListViewPurchase from "@/components/purchase/ListViewPurchase";
import {routeConf} from "@/router";
import purchase from "@/mock/purchase";

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
      items: purchase.filter(p => p !== {}),
      linkActionButton: {
        path: `${routeConf.requestPath}new/items`
      }
    }
  }
}
</script>