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
        <div class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
          <svg class="svg-icon fill-current pointer-events-none text-gray-600 w-4 h-4" viewBox="0 0 20 20">
            <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
          </svg>
        </div>
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
      selfSearchText: this.searchText
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
    selfSearchText (val) {
      this.$emit("update:searchText", val);
    }
  },
  computed: {
    // 自動為內部資料計算過的屬性
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
