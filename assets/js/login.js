$(function() {
    $('#link_reg').on('click', function() {
        $('.loginbox').hide();
        $('.regbox').show();
    })
    $('#link_login').on('click', function() {
        $('.loginbox').show();
        $('.regbox').hide();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            password: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
            //校验两次密码是否一致
            repassword: function(value) {
                var pwd = $('#password').val();
                if (value !== pwd) {
                    return '两次密码不一致';
                }
            }
        })
        // 发起注册请求
    $('.regbox').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/reguser', {
                username: $('#username').val(),
                password: $('#password').val()
            },
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                    // return console.log(res.message);
                }
                layer.msg('注册成功，请登录！');
                // console.log('注册成功，请登录！');
                var timer = setTimeout(function() {
                    $('#link_login').click();
                }, 2000)
            })
    })

    //发起登录请求
    $(".loginbox").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login", //默认当前页
            method: "post", //默认get
            data: {
                username: $('.loginbox [name=uname]').val(),
                password: $('.loginbox [name=pwd]').val()
            }, //格式{key:value}
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = "/index.html";
            }
        })
    })


})