<template>
  <v-container>
    <v-card>
      <v-card-title>
        Block page
        <v-spacer></v-spacer>
        <i>{{blockHeight}}</i>
      </v-card-title>
       <v-list class="transparent">
        <v-list-item>
          <v-list-item-title>Height</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{currentBlock.height}} </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Block Hash</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{currentBlock.id}} </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Previous Block Hash</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{currentBlock.previousblockhash}} </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Timestamp</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{currentBlock.timestamp | timeFormatter}} </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Total Transactions</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{currentBlock.tx_count}} </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Size</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{currentBlock.size | sizeToKBs}} </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Weight</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{currentBlock.weight | weightToKWU}} </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Nonce</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{currentBlock.nonce}} </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Difficulty</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{currentBlock.difficulty}} </v-list-item-subtitle>
        </v-list-item>
    </v-list>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters , mapActions} from 'vuex'
  export default {
    name: 'height',
    computed:{
      ...mapGetters({
        currentBlock: 'getCurrentBlock'
      }),
      blockHeight(){
        return this.$route.params.height
      }
    },
    methods: {
      ...mapActions({
        fetchBlockHash: 'fetchBlockHash'
      })
    },
    mounted(){
      this.fetchBlockHash(this.blockHeight).catch(({response}) => {
        alert(response.data)
        this.$router.go(-1)
      })
    }
  }
</script>
