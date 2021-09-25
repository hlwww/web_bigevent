$(function() {
    var form = layui.form;
    var url = window.location.search;
    var id = url.substr(4);
    // console.log(id);

    getArticle();

    getCate();

    // 初始化富文本编辑器
    initEditor();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#chooseCover').on('click', function() {
        $('#cover').click();
    })

    $('#cover').on('change', function(e) {
        // console.log(e);
        var file = e.target.files;
        // console.log(file);
        if (file.length == 0) return;
        var newImgURL = URL.createObjectURL(file[0]);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    function getArticle() {
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('文章获取失败');


                form.val('formEditArt', res.data);

                // form['formEditArt'] = res.data
                // form.attr('formEditArt', res.data)
            }
        })
    }

    function getCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('文章分类获取失败');
                var htmlStr = template('tpl-artCateList', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }
})