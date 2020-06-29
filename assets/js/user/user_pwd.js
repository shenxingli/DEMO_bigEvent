//这里是修改密码页面的js代码
//不用获取数据渲染到页面,直接添加事件函数

$(function () {
    var layer = layui.layer
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })
    //这里只给submit按钮注册了事件函数,重置按钮(点击清空输入框)由于没有多余的操作,不用再给它注册事件函数,而基本资料需要去获取数据并将数据渲染到页面,所以需要单独注册事件函数
    $('#formUserPwd').on('submit', function (e) {
        //ATTENTION: 之前一直有一个问题,在ajax的success函数里打印响应的res对象,打印不出来,是因为没有阻止提交按钮的默认事件
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/my/updatePwd',

            data: newData(data),
            //这里封装了一个函数来处理发送的表单序列化数据,但是多了一个rePwd的key=value,这里要去除
            //data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.msg || res.message)
                }
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })

    })
})




function newData(data) {

    const dataArr = data.split('&')
    const idx = dataArr.findIndex(item => item.includes('rePwd'))
    const newArr = dataArr.splice(idx, 1)
    const newData = dataArr.join('&')

    return newData
}
