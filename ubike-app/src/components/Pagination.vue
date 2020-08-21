<template>
  <footer class="text-center">
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
  </footer>
</template>

<script>
// 單頁顯示筆數
const COUNT_OF_PAGE = 10;
// 頁碼最大數量
const PAGINATION_MAX = 10;

export default {
  data () {
    return {
      // 要綁定的資料
      currentPage: 1
    }
  },
  props: {
    // 用來接收外部資料的屬性
    uBikeStopsData: Array
  },
  methods: {
    // 用來定義在 vue 實體內使用的函數
    setPage (page) {
      // 設定目前頁數
      if (page < 1 || page > this.totalPageCount) {
        return;
      }
      this.currentPage = page;
    }
  },
  watch: {
    // 用來觀察 vue 實體內資料的變動
  },
  computed: {
    // 自動為內部資料計算過的屬性
    totalPageCount () {
      // 計算總頁數
      return Math.ceil(this.uBikeStopsData.length / COUNT_OF_PAGE);
    },
    pagerEnd () {
      // 頁碼尾端
      return this.totalPageCount <= PAGINATION_MAX
        ? this.totalPageCount
        : PAGINATION_MAX;
    },
    pagerAddAmount () {
      // 頁碼位移
      // 增加Math.round(PAGINATION_MAX / 2) - 1, 調整頁碼最大數量時, 也能使用。
      const tmp =
        this.totalPageCount <= PAGINATION_MAX
          ? 0
          : this.currentPage + Math.round(PAGINATION_MAX / 2) - 1 - this.pagerEnd;

      return tmp <= 0
        ? 0
        : this.totalPageCount - (PAGINATION_MAX + tmp) < 0
        ? this.totalPageCount - PAGINATION_MAX
        : tmp;
    }
  },
  teplate: "",
  components: {
    // 用來定義子元件
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
