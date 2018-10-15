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