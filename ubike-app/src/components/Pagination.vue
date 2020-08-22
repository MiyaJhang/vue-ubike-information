<template>
  <footer class="text-center">
    <nav class="pagination">
      <!-- Previous -->
      <!-- .prevent可防止瀏覽器預設行為, 如果沒有加點擊分頁會重繪並置頂 -->
      <a 
        class="page-link" 
        href="" 
        aria-label="Previous"
        @click.prevent="setPage(selfCurrentPage - 1)"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </a>
      <!-- Content -->
      <a 
        class="page-link" 
        href="" 
        v-for="i in pagerEnd" 
        :key="i" 
        :class="{ 'page-active': i + pagerAddAmount === selfCurrentPage }" 
        @click.prevent="setPage(i + pagerAddAmount)"
      >
        {{ i + pagerAddAmount }}
      </a>
      <!-- Next -->
      <a 
        class="page-link" 
        href="" 
        aria-label="Next"
        @click.prevent="setPage(selfCurrentPage + 1)"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </a>
    </nav>
  </footer>
</template>

<script>
import bus from './bus'

// 單頁顯示筆數
const COUNT_OF_PAGE = 10;
// 頁碼最大數量
const PAGINATION_MAX = 10;

export default {
  data () {
    return {
      // 要綁定的資料
      bus,
      selfCurrentPage: this.currentPage
    }
  },
  props: {
    // 用來接收外部資料的屬性
    uBikeStops: Array,
    currentPage: Number
  },
  methods: {
    // 用來定義在 vue 實體內使用的函數
    setPage(page) {
      // 設定目前頁數
      if (page < 1 || page > this.totalPageCount) {
        return;
      }
      this.selfCurrentPage = page;
      bus.emit('change-page', this.selfCurrentPage);
    },
  },
  watch: {
    // 用來觀察 vue 實體內資料的變動
  },
  computed: {
    // 自動為內部資料計算過的屬性
    totalPageCount () {
      // 計算總頁數
      return Math.ceil(this.uBikeStops.length / COUNT_OF_PAGE);
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
          : this.selfCurrentPage + 4 - this.pagerEnd;

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
