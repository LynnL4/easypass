$(function () {
    setSelfInfo();

    var id = window.location.href.split("=")[1];
    $.getJSON('/su/php/notice/notice.php?code=10201&id=' + id, function (data) {
        $("#title").val(data[0].title);
        $("#content").val(data[0].content);
        $("#author").val(data[0].user_name);
        $("#time").val(data[0].date);
    });
});