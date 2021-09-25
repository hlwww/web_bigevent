$(function() {
    var form = layui.form;
    var laypage = layui.laypage;
    var q = {
        pagenum: 1,
        pagesize: 3,
        cate_id: '',
        state: ''
    }
    initArtList();

    getCate();

    function initArtList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取文章列表失败');
                var htmlStr = template('tpl-artList', res);
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    }

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 8, 10],
            jump: function(obj, first) {
                // console.log(obj);
                // console.log(obj.limit);
                // console.log(obj.curr);
                // console.log(first);
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initArtList();
                }
            }
        });
    }

    function getCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('文章分类获取失败');
                var htmlstr = template('tpl-cateList', res);
                $('[name=cate_id]').append(htmlstr);
                form.render();
            }
        })
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dateFormat = function(date) {
        const dt = new Date(date);
        const y = dt.getFullYear();
        const m = padZero(dt.getMonth() + 1);
        const d = padZero(dt.getDate());
        const hh = padZero(dt.getHours());
        const mm = padZero(dt.getMinutes());
        const ss = padZero(dt.getSeconds());

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;

    }

    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }

    $('#formFilter').on('submit', function(e) {
        e.preventDefault();
        q.cate_id = $('[name=cate_id]').val();
        q.state = $('[name=state]').val();
        console.log(q);
        initArtList();
    })

    $('tbody').on('click', '.btnDel', function() {
        var len = $('.btnDel').length;
        console.log(len);
        var id = $(this).attr('data-id');
        // console.log(id);
        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg('文章删除失败');
                    layer.msg('文章删除成功！');
                    if (len == 1) {
                        q.pagenum = q.pagenum == 1 ? q.pagenum : q.pagenum - 1;
                    }
                    initArtList();
                }
            })
            layer.close(index);
        });

    })

    $('tbody').on('click', '.btnEditArt', function() {
        var id = $(this).attr('data-id');
        // console.log(id);
        location.href = '/article/art_edit.html?id=' + id;
        // console.log(location.href);
    })
})