<template>
  <div id="app" class="w-full max-w-screen-xl mx-auto">
    <Search v-model:searchText="searchText"/>

    <div class="w-full pt-24 px-6 pb-10">
      <table class="w-full text-left table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2" @click="setSort('sno')">#</th>
            <th class="px-4 py-2">場站名稱</th>
            <th class="px-4 py-2">場站區域</th>
            <th class="px-4 py-2" @click="setSort('sbi')">目前可用車輛</th>
            <th class="px-4 py-2" @click="setSort('tot')">總停車格</th>
            <th class="px-4 py-2">資料更新時間</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-teal-100" v-for="s in slicedUbikeStops" :key="s.sno">
            <td class="border px-4 py-2">{{ s.sno }}</td>
            <td class="border px-4 py-2">{{ s.sna }}</td>
            <td class="border px-4 py-2">{{ s.sarea }}</td>
            <td class="border px-4 py-2">{{ s.sbi }}</td>
            <td class="border px-4 py-2">{{ s.tot }}</td>
            <td class="border px-4 py-2">{{ timeFormat(s.mday) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <UbikeTable :uBikeStops="filtedUbikeStops"/> -->

    <div class="text-center">
      <nav class="relative z-0 inline-flex shadow-sm">
        <!-- Previous -->
        <!-- .prevent可防止瀏覽器預設行為, 如果沒有加點擊分頁會重繪並置頂 -->
        <a 
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" 
          href="#" 
          aria-label="Previous"
          @click.prevent="setPage(currentPage - 1)"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
        <!-- 到第一頁 -->
          <!-- <li 
            class="page-item"
            :class="{ 'disabled': !pageTopStatus }"
            @click.prevent="setPageTop(pageTopStatus)"
          >
            <a class="page-link" href="#" aria-label="PageTop">
              第一頁
            </a>
          </li> -->
        <!-- Content -->
        <a 
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" 
          href="#"
          v-for="i in pagerEnd"
          :class="{ active: i + pagerAddAmount === currentPage }"
          :key="i"
          @click.prevent="setPage(i + pagerAddAmount)"
        >
          {{ i + pagerAddAmount }}
        </a>
        <!-- 到最後頁 -->
        <!-- <li 
          class="page-item"
          :disable="pageEndStatus"
          @click.prevent="setPageEnd()"
        >
          <a class="page-link" href="#" aria-label="PageEnd">
            最後頁
          </a>
        </li> -->
        <!-- Next -->
        <a 
          class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" 
          href="#" 
          aria-label="Next"
          @click.prevent="setPage(currentPage + 1)"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
      </nav>
    </div>

    <!-- <Pagination :uBikeStops="filtedUbikeStops"/> -->
  </div>
</template>

<script>
import Search from './components/Search.vue'
// import UbikeTable from './components/UbikeTable.vue'
// import Pagination from './components/Pagination.vue'

// 單頁顯示筆數
const COUNT_OF_PAGE = 10;
// 頁碼最大數量
const PAGINATION_MAX = 10;

export default {
  data () {
    return {
      uBikeStops: [],
      searchText: '',
      currentSort: "sno",
      isSortDesc: false,
      currentPage: 1
    }
  },
  components: {
    Search,
    // UbikeTable,
    // Pagination
  },
  methods: {
    // 用來定義在 vue 實體內使用的函數
    timeFormat(val) {
      // 時間格式
      const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      return val.replace(pattern, "$1/$2/$3 $4:$5:$6");
    },
    setPage(page) {
      // 設定目前頁數
      if (page < 1 || page > this.totalPageCount) {
        return;
      }
      this.currentPage = page;
    },
    setSort(sortType) {
      // 切換排序
      if (sortType === this.currentSort) {
        this.isSortDesc = !this.isSortDesc;
      } else {
        this.currentSort = sortType;
        this.isSortDesc = false;
      }
    }
  },
  watch: {
    // 用來觀察 vue 實體內資料的變動
    watchVale () {
      // console.log(this.searchText);
      // console.log(this.uBikeStops);
    },
    sortedUbikeStops() {
      // 當搜尋條件、排序變更時，強制切到第一頁
      this.setPage(1);
    }
  },
  computed: {
    // 自動為內部資料計算過的屬性
    watchVale () {
      return this.searchText;
    },
    filtedUbikeStops () {
      // 過濾搜尋
      return this.uBikeStops.length === 0
        ? []
        : this.uBikeStops.filter(d => d.sna.includes(this.searchText));
    },
    sortedUbikeStops () {
      // 拿過濾的結果做排序
      const filtedStops = [...this.filtedUbikeStops];

      return this.isSortDesc
        ? filtedStops.sort((a, b) => b[this.currentSort] - a[this.currentSort])
        : filtedStops.sort((a, b) => a[this.currentSort] - b[this.currentSort]);
    },
    slicedUbikeStops () {
      // 將排序的結果做分頁切割
      const start = (this.currentPage - 1) * COUNT_OF_PAGE;
      const end =
        start + COUNT_OF_PAGE <= this.sortedUbikeStops.length
          ? start + COUNT_OF_PAGE
          : this.sortedUbikeStops.length;

      return this.sortedUbikeStops.slice(start, end);
    },
    totalPageCount () {
      // 計算總頁數
      return Math.ceil(this.filtedUbikeStops.length / COUNT_OF_PAGE);
    },
    pagerEnd () {
      // 頁碼尾端
      return this.totalPageCount <= PAGINATION_MAX
        ? this.totalPageCount
        : PAGINATION_MAX;
    },
    pagerAddAmount () {
      // 頁碼位移
      const tmp =
        this.totalPageCount <= PAGINATION_MAX
          ? 0
          : this.currentPage + 4 - this.pagerEnd;

      return tmp <= 0
        ? 0
        : this.totalPageCount - (PAGINATION_MAX + tmp) < 0
        ? this.totalPageCount - PAGINATION_MAX
        : tmp;
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
