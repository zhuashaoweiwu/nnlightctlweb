$(function(){
	$('#login').click(function(){
        var loginName = $('input[name=loginName]');
        var pwd = $('input[name=pwd]');
        var remember = $('#remmberpwd').is(':checked') ? 1 : 0;
        if ($('#loginName').val() == "" || $('#pwd').val() == ""){
            alert("用户名或密码不能为空！");
        }else {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "http://103.48.232.122:8080/nnlightctl/api/login/Login",
                data:{'loginName':loginName.val(),'pwd':pwd.val(),'isRememberMe':remember},
                success: function (result) {
                     // console.log(result)
					if(result.header.code == "1000"){
                       window.location.href='index.html'
					}
                    else{
                        $('#errormsg').show();
					    // alert("用户名和密码错误！请重新输入！");
					}
                },
                error : function(data) {
                    alert("出错：" + data.code);
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