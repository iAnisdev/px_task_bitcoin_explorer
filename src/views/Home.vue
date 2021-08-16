<template>
  <v-container>
    <v-card>
      <v-card-title>
        Latest Blocks
        <v-spacer></v-spacer>
        <v-text-field
          type="number"
          v-model="search"
          append-icon="mdi-magnify"
          placeholder="Search block by height"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="matchedBlocks"
        hide-default-footer
        :disable-pagination="true"
        item-key="height"
        class="elevation-1"
        @click:row="viewRowInfo"
      >
       <template v-slot:[`item.height`]="{ item }">
         <router-link :to="`/${item.height}`">{{ item.height  }}</router-link>
        </template>
       <template v-slot:[`item.timestamp`]="{ item }">
        {{ item.timestamp | timeFormatter }}
        </template>
       <template v-slot:[`item.size`]="{ item }">
        {{ item.size | sizeToKBs}}
        </template>
       <template v-slot:[`item.weight`]="{ item }">
        {{ item.weight | weightToKWU}}
        </template>
      </v-data-table>
    </v-card>
    <v-btn
      rounded
      class="mt-5"
      color="primary"
      @click="loadMoreBlocks"
      dark
    >
      Load More
    </v-btn>
  </v-container>
</template>

<script>
import {mapGetters , mapActions} from 'vuex'
import * as _ from 'underscore'
export default {
  data() {
    return {
      search: null,
      headers: [
        {
          text: "Height",
          align: "start",
          sortable: true,
          value: "height",
        },
        {
          text: "Timestamp",
          align: "start",
          sortable: true,
          value: "timestamp",
        },
        {
          text: "Transactions",
          align: "start",
          sortable: true,
          value: "tx_count",
        },
        {
          text: "	Size (KB)",
          align: "start",
          sortable: true,
          value: "size",
        },
        {
          text: "Weight (KWU)",
          align: "start",
          sortable: true,
          value: "weight",
        },
        
      ]
    };
  },
  computed: {
    ...mapGetters({
      blocks:'getBlocks'
    }),
    matchedBlocks(){
      if(this.search !== null){
        return _.filter(this.blocks , block => (block.height+'').indexOf(this.search) > -1)
      }else{ 
        return this.blocks
      }
    }
  },
  methods: {
    ...mapActions({
      fetchLatestBlocks: 'fetchLatestBlocks'
    }),
    loadMoreBlocks(){
      let height_list = _.pluck(this.blocks , 'height')
      let from_block_height = _.min(height_list)
      this.fetchLatestBlocks(from_block_height - 1)
    },
    viewRowInfo(row){
      this.$router.push(`/${row.height}`)
    }
  },
  mounted() {
    this.fetchLatestBlocks()
  },
};
</script>


<style>
  tr:hover{
    cursor: pointer;
  }
  .v-application a{
    color: #00CCFF !important;
    text-decoration: none;
  }
</style>