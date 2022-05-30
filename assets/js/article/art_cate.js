$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initarticle();

    function initarticle() {
        $.ajax({
            type: "GET", //默认get
            url: "/my/article/cates", //默认当前页
            success: function(res) { //请求成功回调
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                var data = []
                $.each(res.data, function(index, e) {
                    data += ' <tr><td> ' + e.name + ' </td><td >' + e.alias + '</td> <td><button type="button" class="layui-btn layui-btn-sm  btn-add" data-id="' + e.Id + '">编辑</button><button type="button" class="layui-btn layui-btn-sm layui-btn-danger btn-del" data-id="' + e.Id + '" >删除</button></td></tr>'
                })
                $('tbody').html(data)
            },
        })
    }
    var index = null
    $('.addCate').on('click', function() {
        index = layer.open({
            type: 1,
            title: '文章类别管理',
            area: ['500px', '300px'],
            content: $('#add_cate').html()
        })
    })

    $('body').on('submit', '#add_cate_form', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post", //默认get
            url: "/my/article/addcates", //默认当前页
            data: $(this).serialize(),
            success: function(res) { //请求成功回调
                if (res.status !== 0) {
                    // console.log($('#alias').val());
                    layer.close(index);
                    return layer.msg(res.message)
                }
                // console.log($('#alias').val());
                initarticle();
                layer.close(index);
            }
        })
    })

    //点击编辑按钮
    var indexEdit = null
    $('tbody').on('click', '.btn-add', function() {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类名称',
            area: ['500px', '300px'],
            content: $('#edit_cate').html()
        })
        var id = $(this).attr('data-id')
            // console.log(id);
        $.ajax({
            type: "GET", //默认get
            url: "/my/article/cates/" + id, //默认当前页
            success: function(res) { //请求成功回调
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res.data.name);
                form.val('form-edit', res.data)
            }
        })
    })


    //提交修改分类表单
    $('body').on('submit', '#edit_cate_form', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post", //默认get
            url: "/my/article/updatecate", //默认当前页
            data: $(this).serialize(), //格式{key:value}
            success: function(res) { //请求成功回调
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res.data.name);
                layer.close(indexEdit);
                initarticle();
            }
        })
    })

    // 删除文章分类功能
    $('tbody').on('click', '.btn-del', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET", //默认get
                url: "/my/article/deletecate/" + id, //默认当前页
                success: function(res) { //请求成功回调
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(index);
                    initarticle();
                }
            })
        })
    })
})