$(function () {
  const form = layui.form;
  // 自定义校验规则
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
  });
  const infoUser = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
          if(res.status !==0)return
        form.val("formUserInfo", res.data);
      },
    });
  };
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    infoUser();
  });
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(".layui-form").serialize(),
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg("更新用户信息失败！");
        layer.msg("更新用户信息成功！");
        // 调用父页面渲染函数
        window.parent.getInformation();
      },
    });
  });
  infoUser();
});
