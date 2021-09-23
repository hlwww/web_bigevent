$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';
            }
        }
    })

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败！');
                // console.log(res);
                form.val('form_userinfo', res.data);
            }
        })
    }

    initUserInfo();

    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    $('#fromUpdateInfo').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: form.val("form_userinfo"),
            // data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('更新失败');
                layer.msg('更新成功');
                window.parent.getUserInfo();
            }
        })
    })
})