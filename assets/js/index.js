$(function () {
    //思路:在页面打开时,我们需要直接显示(在页面渲染)用户的头像(有user_pic头像用头像,没头像用文字头像)和名称(有昵称用昵称,没昵称用用户名的大写首字母),这就需要我们直接去向获取用户信息的接口发送ajax请求,把得到的res的data解析,得到用户的相关信息,再把这些信息渲染到页面上
    getUserInfo()
    // var layer = layui.layer

    // // 点击按钮，实现退出功能
    // $('#btnLogout').on('click', function() {
    //   // 提示用户是否确认退出
    //   layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
    //     //do something
    //     // 1. 清空本地存储中的 token
    //     localStorage.removeItem('token')
    //     // 2. 重新跳转到登录页面
    //     location.href = '/login.html'

    //     // 关闭 confirm 询问框
    //     layer.close(index)
    //   })
    // })


    // 获取用户的基本信息
    //function getUserInfo() {
    // $.ajax({
    //   type: 'GET',
    //     url: '/my/userinfo',
    //   //以/my开头的是有权限的接口,需要在headers里的Authorization字段添加res.token字段,在前面登录成功的时候就直接存储在localStorage的token属性里,我们这里需要用localStorage.getItem('token')去获得
    //   // headers 就是请求头配置对象
    //   headers: {
    //     Authorization: localStorage.getItem('token') || ''
    //   },
    //     success: function (res) {
    //       //请求成功的处理函数,
    //     if (res.status !== 0) {
    //       return layui.layer.msg('获取用户信息失败！')
    //     }
    //     // 调用 renderAvatar 函数渲染用户的头像
    //     renderAvatar(res.data)
    //   }
    // })//退出按钮的点击事件,在第一个ajax请求的外面
    var layer = layui.layer
    $('#btnLogout').on('click', function (e) {
        e.preventDefault()
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })



    })

})


//自己手写这个ajax请求

function getUserInfo() {


    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        //已经通过baseAPI.js里的函数统一为url添加前置的路径,同样下面的给一些需要权限才能去发送请求的接口由于都需要添加相同字段的请求头,那么也可以在baseAPI.js里统一设置
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res)
            //data: {id: 1071, username: "lili", nickname: "", email: "", user_pic: null}
            //message: "获取用户基本信息成功！"
            //status: 0

            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            renderAvatar(res)

        }


    })
}

function renderAvatar(res) {
    var data = res.data

    var name = data.nickname || data.username

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic)
        $('.text-avatar').hide
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}





// 渲染用户的头像
// function renderAvatar(user) {
//     // 1. 获取用户的名称
//     var name = user.nickname || user.username
//     // 2. 设置欢迎的文本
//     $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
//     // 3. 按需渲染用户的头像
//     if (user.user_pic !== null) {
//       // 3.1 渲染图片头像
//       $('.layui-nav-img')
//         .attr('src', user.user_pic)
//         .show()
//       $('.text-avatar').hide()
//     } else {
//       // 3.2 渲染文本头像
//       $('.layui-nav-img').hide()
//       var first = name[0].toUpperCase()
//       $('.text-avatar')
//         .html(first)
//         .show()
//     }
//   }
