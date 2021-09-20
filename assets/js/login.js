$(function() {
    $('#link_reg').on('click', function() {
        $('.login').hide();
        $('.reg').show();
    })

    $('#link_login').on('click', function() {
        $('.login').show();
        $('.reg').hide();
    })

    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.pwd_reg').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功，请登录~', { icon: 6 });
                $('#link_login').click();
            }
        })
    })

    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.post('/api/login', {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }, function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('登录成功!');
            localStorage.setItem('token', res.token)
            location.href = '/index.html';
        })
    })
})