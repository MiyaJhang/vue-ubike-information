<template>
<header>
  <div class="flex items-center justify-between flex-wrap bg-teal-500 text-white fixed top-0 inset-x-0 z-100 h-16">
    <div class="w-full sm:w-full md:w-full lg:w-full xl:w-1/3 p-3">
      <h1 class="text-xl font-bold">YouBike 臺北市公共自行車即時資訊</h1>
    </div>
    <div class="w-full sm:w-full md:w-full lg:w-full xl:w-1/3 p-3">
      <div class="w-4/5 relative inline-block">
        <input 
          class="w-full py-2 pr-4 pl-10 ease-in-out block border text-left text-gray-600 border-transparent rounded-lg bg-gray-200 focus:outline-none focus:bg-white focus:border-teal-700" 
          type="text" 
          placeholder="Search"
          v-model="selfSearchText">
        <i class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
          <img src="../assets/search.svg" class="svg-icon w-4 h-4"/>
        </i>
      </div>
    </div>
    <div class="w-full sm:w-full md:w-full lg:w-full xl:w-1/3"></div>
  </div>
</header>
</template>

<script>
export default {
  data () {
    return {
      // 要綁定的資料
    }
  },
  props: {
    // 用來接收外部資料的屬性
    searchText: String
  },
  methods: {
    // 用來定義在 vue 實體內使用的函數
  },
  watch: {
    // 用來觀察 vue 實體內資料的變動
  },
  computed: {
    // 自動為內部資料計算過的屬性
    selfSearchText: {
      get () {
        return this.searchText;
      },
      set (value) {
        this.$emit("update:searchText", value);
      }
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
