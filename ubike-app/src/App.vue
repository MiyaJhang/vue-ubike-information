<template>
  <div id="app" class="w-full max-w-screen-xl mx-auto">
    <Search v-model:searchText="searchText"/>

    <UbikeTable 
      :uBikeStops="filtedUbikeStops" 
    />

    <Pagination 
      :uBikeStops="filtedUbikeStops"
      :uBikeStopsSorted="sortedUbikeStops"
    />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import UbikeTable from './components/UbikeTable.vue'
import Pagination from './components/Pagination.vue'

export default {
  data () {
    return {
      uBikeStops: [],
      searchText: '',
      totalPageCount: [],
      sortedUbikeStops: []
    }
  },
  components: {
    Search,
    UbikeTable,
    Pagination
  },
  methods: {
    // 用來定義在 vue 實體內使用的函數
    updateUbikeStops(val) {
      this.sortedUbikeStops = val;
    }
  },
  watch: {
    // 用來觀察 vue 實體內資料的變動
  },
  computed: {
    // 自動為內部資料計算過的屬性
    filtedUbikeStops () {
      // 過濾搜尋
      return this.uBikeStops.length === 0
        ? []
        : this.uBikeStops.filter(d => d.sna.includes(this.searchText));
    }
  },
  created () {
    fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
        .then(res => res.json())
        .then(json => {
          const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
          this.uBikeStops = stops;
        });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
