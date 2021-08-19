<template>
  <v-app>
    <sidebar :items="menuItems"/>

    <v-main>
      <div class="pa-2">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import sidebar from "@/components/app/sidebar"
import {routeConf} from "@/router";
import user from "@/mock/user";


export default {
  name: 'App',
  data(){
    return {
      user: {}
    }
  },
  components: {
    sidebar
  },
  created() {
    this.user = user.find(e => e.authed)
  },
  computed: {
    menuItems(){
      /* config template
      * {title, icon, link}
      * */
      if (this.user.profile?.description === 'admin') {
        return this.menuItemsAdmin
      }
      else {
        return this.menuItemsCommon
      }
    },
    menuItemsAdmin(){
      return [
          ...this.menuItemsCommon,
          ...[
            {
              icon: 'schedule',
              link: `${routeConf.orderPath}toOrder`
            },
            {
              icon: 'mode_edit',
              link: `${routeConf.orderPath}draft`
            },
            {
              icon: 'lock_open',
              link: `${routeConf.requestPath}toApproval`
            },
            {
              icon: 'shopping_cart',
              link: `${routeConf.requestPath}approved`
            }
          ]
      ]
    },
    menuItemsCommon(){
      return [
        {
          icon: 'folder_open',
          link: `${routeConf.requestPath}draft`
        },
        {
          icon: 'send',
          link: `${routeConf.orderPath}receive`
        }
      ]
    }
  }
}
</script>
