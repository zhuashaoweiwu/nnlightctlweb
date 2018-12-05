// (function(){        //闭包
    function load_script(xyUrl, callback){
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = xyUrl;
        //借鉴了jQuery的script跨域方法
        script.onload = script.onreadystatechange = function(){
            if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
                callback && callback();
                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                if ( head && script.parentNode ) {
                    head.removeChild( script );
                }
            }
        };
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        head.insertBefore( script, head.firstChild );
    }
    function translate(point,type,callback,param){
        var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
        o[callbackName] = function(result){
            delete o[callbackName];    //调用完需要删除改函数
            if (result.status === 0) {
                var point = new BMap.Point(result.result[0].x, result.result[0].y);
                callback && callback(point, param);
            }
        }
        var xyUrl = "http://api.map.baidu.com/geoconv/v1/?coords=" + point.lng + "," + point.lat + "&from=" + type + "&to=5&ak=iEWlGKfvfIdgtRo0GYimqcGzhmLvi3cb&callback=o." + callbackName;
        //动态创建script标签
        load_script(xyUrl);
    }

    var o = {};

//     window.BMap = window.BMap || {};
//     BMap.Convertor = {};
//     BMap.Convertor.translate = translate;
// })();