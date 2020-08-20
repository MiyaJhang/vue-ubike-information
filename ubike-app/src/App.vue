<template>
  <div id="app" class="w-full max-w-screen-xl mx-auto">
    <Search 
      :uBikeStopsData="uBikeStops" 
      @update="searchUpdate"/>
    <UbikeTable :uBikeStopsData="newUbikeStops"/>
    <Pagination :uBikeStopsData="newUbikeStops"/>
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
      newUbikeStops: []
    }
  },
  components: {
    Search,
    UbikeTable,
    Pagination
  },
  watch: {
    // 用來觀察 vue 實體內資料的變動
  },
  methods: {
    searchUpdate (val) {
      this.newUbikeStops = [...val];
    }
  },
  computed: {
    // 自動為內部資料計算過的屬性
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
