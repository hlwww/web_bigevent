$(function() {
    getUserInfo();

    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败！');
                console.log(res);
                renderAvatar(res.data);
            }
            // complete: function(res) {
            //     console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //         localStorage.removeItem('token');
            //         location.href = '/login.html';
            //     }
            // }
    })
}

function renderAvatar(userinfo) {
    var name = userinfo.nickname || userinfo.username;
    console.log(name);
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    if (userinfo.user_pic) {
        $('.layui-nav-img').attr('src', userinfo.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').show().html(first);
    }
}