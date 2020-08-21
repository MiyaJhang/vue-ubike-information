<template>
  <div class="w-full pt-24 px-6 pb-10">
    <table class="w-full text-left table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">場站名稱</th>
          <th class="px-4 py-2">場站區域</th>
          <th class="px-4 py-2">目前可用車輛</th>
          <th class="px-4 py-2">總停車格</th>
          <th class="px-4 py-2">資料更新時間</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-teal-100" v-for="u in uBikeStops" :key="u.sno">
          <td class="border px-4 py-2">{{ u.sno }}</td>
          <td class="border px-4 py-2">{{ u.sna }}</td>
          <td class="border px-4 py-2">{{ u.sarea }}</td>
          <td class="border px-4 py-2">{{ u.sbi }}</td>
          <td class="border px-4 py-2">{{ u.tot }}</td>
          <td class="border px-4 py-2">{{ timeFormat(u.mday) }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <pre>{{ uBikeStopsData }}</pre> -->
  </div>
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
    uBikeStops: Array
  },
  methods: {
    // 用來定義在 vue 實體內使用的函數
    timeFormat (val) {
      // 時間格式
      const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      return val.replace(pattern, "$1/$2/$3 $4:$5:$6");
    },
  },
  watch: {
    // 用來觀察 vue 實體內資料的變動
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
