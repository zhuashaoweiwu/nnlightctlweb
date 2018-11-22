//设置ajax全局默认参数
$.ajaxSetup({
    contentType : "application/x-www-form-urlencoded",
    timeout : 60000,
    dataType : "json",
    async: false,
    xhrFields: {
        withCredentials: true    // 要在这里设置 跨域设置cookie
    },
    error : function (xmlRequest, errorInfo, exception) {
        console.log("XmlHttpRequest:" + xmlRequest + ", errorInfo:" + errorInfo + ", exception:" + exception);
    }
});

function ajaxRequest(requestType, url, params, backFuc) {
    $.ajax({
        method : requestType,
        url : BASE_ROOT + url,
        data : params,
        success : function (data) {
            backFuc(data);
        }
    });
}

//时间方法,时间对象转换成"2010-09-12 22:12:23"格式
function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}

//时间方法，时间对象转换成"2010-09-12"格式
function formatDate(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;

    return y + '-' + m + '-' + d;
}
//时间方法，将毫秒转换成标准时间格式
function transDate(date){
    date = new Date(date);
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();
    var h=date.getHours();
    var m1=date.getMinutes();
    var s=date.getSeconds();
    m = m<10?("0"+m):m;
    d = d<10?("0"+d):d;
    return y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
}
//时间方法，形如"2010-09-12"格式转换成时间对象
function str2Date(dateStr) {
    if (!dateStr) {
        return null;
    }
    return new Date(dateStr.replace(/-/g,"/"));
}


//数组转换成后台可识别模式
function transArray(data) {
    var dataType = typeof data;
    if (dataType == "string" || dataType == "number") {
        return data;
    }
    var afterTransData = {};
    if (data) {
        for (var key in data) {
            var value = data[key];
            if (Array.isArray(value)) {
                //是数组
                for (var i = 0; i < value.length; ++i) {
                    var o = value[i];
                    var result = transArray(o);
                    var resultType = typeof result;
                    if (resultType == "string" || resultType == "number") {
                        var newKey = key + "[" + i + "]";
                        afterTransData[newKey] = result;
                        continue;
                    }
                    for (var key1 in result) {
                        var newKey = key + "[" + i + "]" + "." + key1;
                        afterTransData[newKey] = result[key1];
                    }
                }
            } else {
                //非数组
                afterTransData[key] = value;
            }
        }
    }

    return afterTransData;
}

//判断是否编辑模式，并获取编辑id
function editModel(url) {
    var qIndex = url.lastIndexOf("?");
    if (qIndex != -1) {
        var requestParam = url.substring(qIndex + 1);
        if (requestParam) {
            var id = requestParam.substring(requestParam.lastIndexOf("=") + 1);
            return id;
        }
    }

    return null;
}

//判断是否编辑模式，获取url参数
function editModelParam(url) {
    var qIndex = url.lastIndexOf("?");
    if (qIndex != -1) {
        var requestParam = url.substring(qIndex + 1);
        if (requestParam) {
            return decodeURIComponent(requestParam);
        }
    }

    return null;
}

//判断是否编辑模式，并获取编辑id
function editModel2(url) {
    var qIndex = url.lastIndexOf("?");
    if (qIndex != -1) {
        var requestParam = url.substring(qIndex + 1);
        if (requestParam) {
            var codeNunber = requestParam.substring(requestParam.lastIndexOf("=") + 1);
            return encodeURIComponent(codeNunber);
        }
    }

    return null;
}

//对象转换url参数
function object2UrlParamStr(object) {
    var urlParam = "";
    for (var key in object) {
        urlParam += (key + "=" + object[key]);
        urlParam += ",";
    }
    urlParam = urlParam.substring(0, urlParam.lastIndexOf(","));

    return urlParam;
}

//百度地图API功能
function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=ow29ANFSyXM6nf6cYl14GdDI&callback=init";
    document.body.appendChild(script);
}