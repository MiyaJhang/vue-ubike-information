<template>
  <div id="app" class="w-full max-w-screen-xl mx-auto">
    <Search v-model:searchText="searchText"/>

    <UbikeTable 
      :uBikeStops="filtedUbikeStops" 
      :currentPage="currentPage"
    />

    <Pagination 
      :uBikeStops="filtedUbikeStops" 
      :currentPage="currentPage"
    />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import UbikeTable from './components/UbikeTable.vue'
import Pagination from './components/Pagination.vue'

import bus from './components/bus'

export default {
  data () {
    return {
      bus,
      uBikeStops: [],
      searchText: '',
      currentPage: 1
    }
  },
  components: {
    Search,
    UbikeTable,
    Pagination
  },
  methods: {
    // 用來定義在 vue 實體內使用的函數
    changePage(val) {
      // 想利用這個function做變更currentPage
      this.currentPage = val;
    }
  },
  watch: {
    // 用來觀察 vue 實體內資料的變動
  },
  computed: {
    // 自動為內部資料計算過的屬性
    filtedUbikeStops() {
      // 過濾搜尋
      return this.uBikeStops.length === 0
        ? []
        : this.uBikeStops.filter(d => d.sna.includes(this.searchText));
    }
  },
  created() {
    fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
        .then(res => res.json())
        .then(json => {
          const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
          this.uBikeStops = stops;
        });
    bus.on('change-page', function(val) {
      // 這邊取得到值了, 但無法將this.changePage放進來 QQ
      console.log(val);
    });
  },
  beforeUnmount () {
    // 銷毀 減少記憶體 要養成良好的習慣
    // 注意使用名稱 重複
    bus.off('change-page', function(val) {
      console.log(val);
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
