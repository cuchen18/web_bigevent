function getInformation() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers:{
    //     Authorization:localStorage.getItem('token')
    // },
    success: (res) => {
      console.log(res);
      renderAvator(res.data);
    },
  });
}
// 渲染个人中心
const renderAvator = (user) => {
  let uname = user.nickname || user.username;
  $("#welcome").html(`欢迎 ${uname}`);
  if (user.user_pic !== null) {
    $(".text-avatar").hide();
    $(".layui-nav-img").attr("src", user.user_pic);
  } else {
    $(".layui-nav-img").hide();
    $(".text-avatar").html(uname[0].toUpperCase());
  }
};
// 退出功能
$("#closebtn").on("click", () => {
  console.log(123);
  layui.layer.confirm(
    "确定退出登录？",
    { icon: 3, title: "" },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem("token");
      // 重新跳转到登录页面
      location.href = "/login.html";
    }
  );
});

getInformation();
