export default {
    data() {
        return {
            "baseUrl": "http://localhost:8083"
        }
    },
    created() {
        this.loadSettings('/data/settings.json', 'settings.json')
    },
    methods: {
        getUrl (path) {
            return this.baseUrl + path
        },
        getFileUrl (store, id) {
            return `${this.baseUrl}/_files/${store}/${id}`
        },
        loadSettings (url, filename) {
            var vm = this;
            $.get({
                url: url,
                success: function(data) {
                    vm.baseUrl = data.baseUrl;
                },
                error: function(xhr, status, error) {
                    if(xhr.status === 404) {
                        console.log(`可以通过 data/${filename} 文件来配置 jsonp 请求的 webapi 基础 URL 路径！`)
                    }
                }
            })
        }
    }
}
