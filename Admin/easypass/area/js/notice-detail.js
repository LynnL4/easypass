$(function () {
    setSelfInfo();
    $("#submit").click(function () {
        var title = $("#title").val();
        var account_id = getCookie("account_id");
        var area_id =  getCookie("area_id");
        var community_id = -1;
        var content =$("#content").val().replace(/[\t\r\n]/g,"");//过滤非法字符;

        if(title==='')
            alert('标题不能为空');
        else if(content==='')
            alert('内容不能为空');
        else {
            $.post('/area/php/notice/notice.php?code=10222',{
                title:title,
                account_id: account_id,
                content:content,
                area_id: area_id,
                community_id: community_id
            }, function (data) {
                if(data==='1') {
                    alert('发布成功');
                    window.location.href = 'notice-list.html';
                }
                else if(data === '0')
                    alert('出现未知错误，发布失败');
                else
                    alert(data);
            });
        }
    });
});