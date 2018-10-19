$(function(){
    $('#login').click(function(){
        var loginName = $('input[name=loginName]');
        var pwd = $('input[name=pwd]');
        var remember = $('#remmberpwd').is(':checked') ? 1 : 0;
        if ($('#loginName').val() == "" || $('#pwd').val() == ""){
            alert("用户名或密码不能为空！");
        }else {
            ajaxRequest("post", "/api/login/Login", {'loginName':loginName.val(),'pwd':pwd.val(),'isRememberMe':remember},
                function (data) {
                    if(data.header.code == "1000"){
                        window.location.href='Index.html'
                    }
                    else{
                        $('#errormsg').show();
                        $("#errormsg").text(data.header.msg);
                    }
                });
        }

    });

})
function keydown(e){
    var e = e || event;
    if (e.keyCode==13) {
        $("#login").click();
    }
}