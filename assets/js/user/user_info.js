$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function() {
            if ($('#nickname').val().length > 10) {
                return '昵称长度应在1~10位之间'
            }
        }
    })

    initUserInfo();

    $('.reset').on('click', function(e) {
        e.preventDefault();
        // console.log(111);
        initUserInfo();
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
                type: "POST", //默认get
                url: "/my/userinfo", //
                data: $(this).serialize(),
                success: function(res) { //请求成功回调
                    if (res.status !== 0) {
                        return layer.msg('更新用户信息失败!')
                    }
                    // console.log(res);
                    layer.msg('更新用户信息成功!')
                    window.parent.GetUserInfo();
                }
            })
            // console.log($(this).serialize());
    })

    function initUserInfo() {
        $.ajax({
            type: "GET", //默认get
            url: "/my/userinfo", //默认当前页
            success: function(res) { //请求成功回调
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                };
                form.val('formUseerinfo', res.data);

            }
        })
    }
})