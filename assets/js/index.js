$(function() {
        GetUserInfo();
        //实现退出
        $('.logout').on('click', function() {
            layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
                //do something
                location.href = '/login.html';
                // localStorage.setItem('token', '')
                localStorage.removeItem('token')

            });
        })
    })
    //获取用户基本信息
function GetUserInfo() {
    $.ajax({
        type: "GET", //默认get
        url: "/my/userinfo",
        success: function(res) { //请求成功回调
                // console.log(res);
                if (res.status !== 0) {
                    // localStorage.removeItem('token');
                    // location.href = '/login.html';
                    return layui.layer.msg(res.message)
                }
                renderAvatar(res.data);
            }
            // complete: function(res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token');
            //         location.href = '/login.html';
            //     }
            // }
    })
}

function renderAvatar(e) {
    var name = e.nickname || e.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (e.user_pic !== null) {
        $('.layui-nav-img').attr('src', e.user_pic).show()
        $('.text-avatar').hide();
        $('.text-top-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var frist = name[0].toUpperCase();
        $('.text-avatar').html(frist).show();
        $('.text-top-avatar').html(frist).show();
    }
}