<template>
  <v-navigation-drawer app mini-variant color="primary" v-model="active">
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://www.cidademarketing.com.br/marketing/wp-content/uploads/2021/06/tigre_marca.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group :v-model="active">
        <v-list-item
            v-for="(item) in items" :key="item.link"
            link :value="item.link" :to="item.link"
            color="#fff"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon class="ml-0">
                <v-icon color="#fff" v-text="item.icon" v-on="on" v-bind="attrs"/>
              </v-list-item-icon>
            </template>
            <span v-text="$t(item.link)"/>
          </v-tooltip>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      active: ''
    }
  },
  created() {
    this.active = this.$route.path
  },
  props: {
    items: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>