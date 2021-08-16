<template>
  <v-app>
    <navbar />
    <v-main>
      <router-view/>
    </v-main>
    <loader v-if="showLoader"/>
  </v-app>
</template>

<script>
import navbar from '@/components/navbar.vue'
import loader from '@/components/loader.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components:{
    navbar,
    loader
  },
  computed:{
    ...mapGetters({
      showLoader: 'getLoaderStatus'
    })
  }
};
</script>
