//设置ajax全局默认参数
$.ajaxSetup({
    dataType : "json",
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
            console.log(id);
            return id;
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
            console.log(codeNunber);
            return codeNunber;
        }
    }

    return null;
}