$(function() {
    var layer = layui.layer
    var laypage = layui.laypage;
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    var q = {
        pagenum: 1, //页码值 默认显示第一页
        pagesize: 2, //每一页显示的数据 默认每页显示2条数据
        cate_id: '', //文章分类的 Id
        state: '', //文章的状态，可选值有：已发布、草稿

    }

    initTable();
    initCate();

    //获取文章数据
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
                layui.form.render();
                // 调用渲染分页的方法
                rendrePage(res.total);
            }
        })
    }

    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                // console.log(res);
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();

            }
        })
    }

    // 筛选功能
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })

    //分页方法

    function rendrePage(total) {

        laypage.render({
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 4, 5],
            elem: 'pagebox', //注意，这里的 pagebox 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每一页显示几条数据
            curr: q.pagenum, //默认显示第几页
            jump: function(obj, first) { //分页发生切换的时候 触发jump回调
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    //do something
                    initTable();
                    //首次不执行
                }
            }
        });
    }

    // 删除文章
    $('tbody').on('click', '.btn-delete', function(e) {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        e.preventDefault()
        layer.confirm('是否删除文章？', { icon: 3, title: '提示' }, function(index) {
            console.log(index);
            $.ajax({
                type: "GET", //默认get
                url: "/my/article/delete/" + id, //默认当前页
                success: function(res) { //请求成功回调
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)

                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable();
                }
            })
            layer.close(index);
        });
    })

    //编辑文章
})