$(function() {
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取类别失败');
                var htmlStr = template('tpl-table', res);
                // console.log(htmlStr);
                $('#tbody').html(htmlStr);
            }
        })
    }

    var indexAdd = null;
    $('#addCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    $('body').on('submit', '#formAddCate', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('类别添加失败');
                layer.msg('类别添加成功！');
                layer.close(indexAdd);
                initArtCateList();
            }
        })
    })


    var indexEdit = null;
    var form = layui.form;
    $('tbody').on('click', '#btnEdit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取该分类失败');
                form.val('formEdit', res.data);

            }
        })
    })

    $('body').on('submit', '#formEditCate', function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('修改失败');
                layer.msg('修改成功！');
                initArtCateList();
                layer.close(indexEdit);
            }
        })
    })

    $('tbody').on('click', '#btnDelete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) return layer.msg('删除失败');
                    layer.msg('删除成功');
                    initArtCateList();
                }
            })

            layer.close(index);
        });
    })
})