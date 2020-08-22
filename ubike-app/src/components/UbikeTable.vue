<template>
  <div class="w-full pt-24 px-6 pb-10">
    <table class="w-full text-left table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2" @click="setSort('sno')">
            #
            <i class="inline-block" v-show="currentSort === 'sno'">
              <img 
                v-show="isSortDesc === true" 
                src="../assets/sort-up.svg" 
                class="svg-icon w-3 h-3"/>
              <img 
                v-show="isSortDesc === false" 
                src="../assets/sort-down.svg" 
                class="svg-icon w-3 h-3"/>
            </i>
          </th>
          <th class="px-4 py-2">場站名稱</th>
          <th class="px-4 py-2">場站區域</th>
          <th class="px-4 py-2" @click="setSort('sbi')">
            目前可用車輛
            <i class="inline-block" v-show="currentSort === 'sbi'">
              <img 
                v-show="isSortDesc === true" 
                src="../assets/sort-up.svg" 
                class="svg-icon w-3 h-3"/>
              <img 
                v-show="isSortDesc === false" 
                src="../assets/sort-down.svg" 
                class="svg-icon w-3 h-3"/>
            </i>
          </th>
          <th class="px-4 py-2" @click="setSort('tot')">
            總停車格
            <i class="inline-block" v-show="currentSort === 'tot'">
              <img 
                v-show="isSortDesc === true" 
                src="../assets/sort-up.svg" 
                class="svg-icon w-3 h-3"/>
              <img 
                v-show="isSortDesc === false" 
                src="../assets/sort-down.svg" 
                class="svg-icon w-3 h-3"/>
            </i>
          </th>
          <th class="px-4 py-2">資料更新時間</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-teal-100" v-for="s in sortedUbikeStops" :key="s.sno">
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
</template>

<script>
export default {
  data() {
    return {
      // 要綁定的資料
      currentSort: "sno",
      isSortDesc: true
    }
  },
  props: {
    // 用來接收外部資料的屬性
    uBikeStops: Array
  },
  methods: {
    // 用來定義在 vue 實體內使用的函數
    timeFormat(val) {
      // 時間格式
      const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      return val.replace(pattern, "$1/$2/$3 $4:$5:$6");
    },
    setSort(sortType) {
      // 切換排序
      if (sortType === this.currentSort) {
        this.isSortDesc = !this.isSortDesc;
      } else {
        this.currentSort = sortType;
        this.isSortDesc = false;
      }
      // this.$emit('update-ubikestops', this.sortedUbikeStops);
    }
  },
  watch: {
    // 用來觀察 vue 實體內資料的變動
  },
  computed: {
    // 自動為內部資料計算過的屬性
    sortedUbikeStops() {
      // 拿過濾的結果做排序
      const filtedStops = [...this.uBikeStops];

      return this.isSortDesc
        ? filtedStops.sort((a, b) => a[this.currentSort] - b[this.currentSort])
        : filtedStops.sort((a, b) => b[this.currentSort] - a[this.currentSort]);
    },
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
