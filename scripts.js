// 單頁顯示筆數
const COUNT_OF_PAGE = 10;

// 頁碼最大數量
const PAGINATION_MAX = 10;

const vm = Vue.createApp({
    data () {
      return {
        uBikeStops: [],
        searchValue: '',
        isSortState: false,
        currentSort: '',
        currentPage: 1
      }
    },
    watch: {
      sortUbikeStops() {
        // 當搜尋條件、排序變更時，強制切到第一頁
        this.setPage(1);
      }
    },
    methods: {
      timeFormat(t){
        // 時間格式
        var date = [], time = [];

        date.push(t.substr(0, 4));
        date.push(t.substr(4, 2));
        date.push(t.substr(6, 2));
        time.push(t.substr(8, 2));
        time.push(t.substr(10, 2));
        time.push(t.substr(12, 2));

        return date.join("/") + ' ' + time.join(":");

        // 備註: 老師時間格式的另一個作法
        // const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
        // return val.replace(pattern, "$1/$2/$3 $4:$5:$6");
      },
      setSort (sort) {
        // 切換排序狀態
        if (sort === this.currentSort) {
          this.isSortState = !this.isSortState;
        } else {
          this.currentSort = sort;
          this.isSortState = false;
        }
      },
      setPage (page) {
        // 設定目前頁數
        if (page < 1 || page > this.totalPageCount) {
          return;
        }
        this.currentPage = page;
      },
      setPageTop (status) {
        const top = 1;
        if (!status) {
          return;
        }
        this.setPage(top);
      },
      setPageEnd () {
        const end = Math.round(this.sortUbikeStops.length / COUNT_OF_PAGE);
        this.setPage(end);
      }
    },
    computed: {
      filterUbikeStops () {
        // 場站名稱搜尋
        return this.uBikeStops.length === 0
          ? []
          : this.uBikeStops.filter(d => d.sna.includes(this.searchValue));
      },
      sortUbikeStops () {
        // 搜尋結果做排序功能
        // 新的陣列需要 return 若是原有的不一定要return
        const newUbikeStops = [...this.filterUbikeStops];
        return this.isSortState 
          ? newUbikeStops.sort((a, b) => a[this.currentSort] - b[this.currentSort])
          : newUbikeStops.sort((a, b) => b[this.currentSort] - a[this.currentSort]);
      },
      sliceUbikeStops () {
        // 將排序的結果做分頁切割
        const start = (this.currentPage - 1) * COUNT_OF_PAGE;
        const end = start + COUNT_OF_PAGE <= this.sortUbikeStops.length
          ? start + COUNT_OF_PAGE
          : this.sortUbikeStops.length;

        return this.sortUbikeStops.slice(start, end);
      },
      totalPageCount () {
        // 計算總頁數
        return Math.ceil(this.filterUbikeStops.length / COUNT_OF_PAGE);
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
      },
      pageTopStatus () {
        return this.currentPage > Math.round(PAGINATION_MAX / 2) - 2
          ? true
          : false
      },
      pageEndStatus () {
        return this.currentPage < Math.round(this.sortUbikeStops.length / COUNT_OF_PAGE) - PAGINATION_MAX
          ? true
          : false
      }
    },
    created() {

        // 欄位說明請參照:
        // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

        // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
        // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
        // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
        // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態

        fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
          .then(res => res.json())
          .then(res => {
              // 將 json 轉陣列後存入 this.uBikeStops
              this.uBikeStops = Object.keys(res.retVal).map(key => res.retVal[key]);
          });
    }
}).mount('#app');