$(function() {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('.upload').on('click', function() {
        $('#file').click();
    })
    $('#file').on('change', function(e) {
        // console.log(e.target.files);
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }
        var file = e.target.files[0]
        var imgurl = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imgurl).cropper(options)
    })

    $('.layui-btn-danger').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            type: "post", //默认get
            url: "/my/update/avatar", //默认当前页
            data: {
                avatar: dataURL
            }, //格式{key:value}
            success: function(res) { //请求成功回调
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                window.parent.GetUserInfo();
            },
            error: function(e) { //请求超时回调
                if (e.statusText == "timeout") {
                    alert("请求超时")
                }
            }

        })
    })


})