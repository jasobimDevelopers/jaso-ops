export default {
    methods: {
        ajax(url, params = {}, func = null, post = false) {
            $.ajax({
                url: url,
                method: post ? 'post' : 'get',
                data: params,
                success: function(data) {
                    if(func && typeof(func) === "function") {
                        func(data)
                    }
                },
                error: function(xhr, textStatus, error) {
                    console.log('ajax request for url "' + url + '" failed, the detail info is ' + JSON.stringify(xhr))
                }
            })
        },
        jsonp(url, params = {}, func = null, post = false, err = null) {
            var vm = this
            var result = null

            $.ajax({
                url: vm.$root.getUrl(url),
                type: post ? "POST" : "GET",
                crossDomain: true,
                jsonp: "callback",
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                data: params,
                timeout: 10000,
                success: function(data) {
                    if(func && typeof(func) === "function") {
                        if(data.Status === 401) {
                            window.location = '/login.html'
                        } else if(data.Status === 403) {
                            alert(data.Message)
                        } else if(data.Status === 0) {
                            func(data)
                        } else {
                            if(err && typeof(err) === "function") {
                                err(data)
                            } else {
                                console.error(`An error occurred when calling "${url}" by jsonp, the result is ${JSON.stringify(data)}`)
                                alert(data.Message)
                            }
                        }
                    }
                },
                error: function(xhr, status, error) {
                    console.error(`An error occurred when calling "${url}" by jsonp, the result is ${JSON.stringify(xhr)}`)

                    if(status === "timeout") {
                        result = {
                            Status: -1,
                            Message: '请求超时!'
                        }
                    } else if (status === "error" && !error) {
                        result = {
                            Status: -2,
                            Message: '服务器通讯失败!'
                        }
                    } else {
                        result = {
                            Status: -3,
                            Message: `服务器处理出现异常，原因为${error}!`
                        }
                    }

                    if(err && typeof(err) === "function") {
                        err(result)
                    } else {
                        alert(result.Message)
                    }
                }
            })
        },
        jsonpWithFiles(url, params = {}, files, func = null, err = null) {
            var vm = this
            var result = null

            var form = new FormData()
            if(files && files.length > 0) {
                for(var i = 0; i < files.length; i++) {
                    form.append('files', files[i])
                }
            }
            for(var key in params) {
                form.append(key, params[key])
            }

            $.ajax({
                url: vm.$root.getUrl(url),
                type: "POST",
                contentType: false,
                processData: false,
                data: form,
                xhrFields: {
                    withCredentials: true
                },
                timeout: 10000,
                success: function(data) {
                    if(func && typeof(func) === "function") {
                        if(data.Status === 0) {
                            func(data)
                        } else {
                            if(err && typeof(err) === "function") {
                                err(data)
                            } else {
                                console.error(`An error occurred when calling "${url}" by jsonpWithFiles, the result is ${JSON.stringify(data)}`)
                                alert(data.Message)
                            }
                        }
                    }
                },
                error: function(xhr, status, error) {
                    console.error(`An error occurred when calling "${url}" by jsonpWithFiles, the result is ${JSON.stringify(xhr)}`)

                    if(status === "timeout") {
                        result = {
                            Status: -1,
                            Message: '请求超时!'
                        }
                    } else if (status === "error" && !error) {
                        result = {
                            Status: -2,
                            Message: '服务器通讯失败!'
                        }
                    } else {
                        result = {
                            Status: -3,
                            Message: `服务器处理出现异常，原因为${error}!`
                        }
                    }

                    if(err && typeof(err) === "function") {
                        err(result)
                    } else {
                        alert(result.Message)
                    }
                }
            })
        }
    }
}