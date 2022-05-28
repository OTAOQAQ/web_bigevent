$(function() {
    var form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if (value === $('#old_pwd').val()) {
                return '新密码不能与旧密码一致'
            }
        },
        repwd: function(value) {
            if (value !== $('#new_pwd').val()) {
                return '两次密码不一致'
            }
        }
    })


    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "post", //默认get
            url: "/my/updatepwd", //默认当前页
            data: {
                oldPwd: $('#old_pwd').val(),
                newPwd: $('#new_pwd').val()
            }, //格式{key:value}
            success: function(res) { //请求成功回调
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                    // console.log($('.layui_form'));
                    // $('.reset').click(); //修改密码成功后退出 需用新密码登录
                    // window.parent.$('.logout').click();

            }


        })

    })
})