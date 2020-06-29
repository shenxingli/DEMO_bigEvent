//这里是个人中心的基本资料菜单栏里的js代码

//首先先给nickname输入框添加一个验证规则
//然后需要获取用户的信息渲染到页面上对应的input标签里,
//再给修改提交和重置按钮注册点击事件

$(function () {

    //下面是定义nickname验证规则的代码,调用form的verify方法,里面有两种写法传入一个对象
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
        //要添加的表单验证规则也可以写成下面的形式
        //   pass: [
        //     /^[\S]{6,12}$/
        //     ,'密码必须6到12位，且不能出现空格'
        //   ]
    })

    //接着是获取用户信息的操作
    // 这里先手动写一个获取用户信息的函数

    getUserInfo()


    //重置按钮的点击事件,阻止默认提交事件,重新获取用户信息,再渲染,调用封装好的getUserInfo函数

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        getUserInfo()
    })
    //form表单的提交事件,以后推荐给form表单注册提交事件,而不再是提交按钮的点击事件,主要是为了方便使用$(this).serialize()方法(表单序列化)提交请求发送的数据,这种方法需要先阻止submit的默认事件
    $('#formUserInfo').on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatePwd',
            //几种常用获取表单元素的 value 值
            //  * $('.layui-form [name=username]').val()   -- 传统方式取 value 值
            //  * $(this).serialize() --  更方便一些(会自动剔除具有 disabled 属性的value值)
            //  * 站在巨人的肩膀上，使用UI库自带的方法：form.val('formUserInfo')，获取到的值是一个对象
            data: $(this).serialize(),
            //ATTENTION: 这里有个问题,后端的接口写的是id从token字符串里解析,那么就不需要从页面获取id这个key和value值作为数据传给后端,如果后端的接口是说从req.body.id获取id值,那么就必须从页面获取到name为id的input输入框的值
            //这里用serialize()方法提交的数据是urlencoded格式的,后端直接用自带的解析中间件搞定,我们需要给后端提供的是三个name分别为id,nickname,email的input输入框的值,这里要给username的输入框设置disabled属性,可以在提交请求数据的时候自动忽略
            success: function (res) {
               // console.log(res)
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败")
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息,因为这个是iframe里的操作来影响外部的页面
                window.parent.getUserInfo()
            }
        })
    })













    function getUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //把获取到的res.data作为参数传入form.val()方法,用来填充指定form表单的input框,但是name属性要一一对应
                console.log(res.data)
                form.val('formUserInfo', res.data)
            }


        })

    }










})
