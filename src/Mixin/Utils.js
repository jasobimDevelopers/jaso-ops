var moment = require('moment')

export default {
    created () {
        moment.locale('zh-CN')
    },
    methods: {
        formatDate (date, format) {
            format = format || 'YYYY/MM/DD LT'
            var result = moment(date).format(format)
            return result
        }
    }
}