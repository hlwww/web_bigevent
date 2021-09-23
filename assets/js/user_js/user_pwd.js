$(function() {
    var form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        confirmPwd: function(value) {
            var pwd = $('.layui-form-item [name=newPwd]').val();
            if (value !== pwd) {
                return '两次密码不一致！';
            }
        },
        samePwd: function(value) {
            var oldpwd = $('.layui-form-item [name=oldPwd]').val();
            if (value === oldpwd) {
                return '新旧密码不能相同！';
            }
        }

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // $.ajax({
        //     method: 'Post',
        //     url: '/my/updatepwd',
        //     data: $(this).serialize(),
        //     success: function(res) {
        //         if (res.status !== 0) return layer.msg('更新密码失败');
        //         layer.msg('更新密码成功');
        //         $('.layui-form')[0].reset();
        //     }
        // })
        $.post('/my/updatepwd', {
            oldPwd: $('.layui-form-item [name=oldPwd]').val(),
            newPwd: $('.layui-form-item [name=newPwd]').val()
        }, function(res) {
            if (res.status !== 0) {
                layer.msg('更新密码失败');
                $('.layui-form')[0].reset();
            } else {
                layer.msg('更新密码成功');
                $('.layui-form')[0].reset();
            }
        })
    })
})