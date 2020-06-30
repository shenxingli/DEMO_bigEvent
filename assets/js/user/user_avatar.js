$(function () {

    var layer = layui.layer
    var form = layui.form
    // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
    $image.cropper(options)

//点击上传的事件函数,这里我们是给上传按钮旁边加一个input框,type属性为file,可以用来选择文件输入,但是样式很丑,我们把它display:none;用用户点击上传的事件模拟用户点击之前的那个input(type="file")输入框

$('#btnChooseImage').on('click',function (){//当点击上传按钮的时候,等于点击了隐藏的那个input文件输入框
    $('#file').click()
})
$('#file').on('change',function (e){
    var filelist = e.target.files

    if (filelist.length === 0) {
        return layer.msg('请选择图片')
    }
    //用户成功选择图片后
    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
})

    //下面是将图片上传到服务器的过程
// 为确定按钮，绑定点击事件
$('#btnUpload').on('click', function() {
    // 1. 要拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2. 调用接口，把头像上传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
        },
      //后端接口需要的数据就是变量avatar对应的值
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })
  })


})
