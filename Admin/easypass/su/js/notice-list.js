$(function () {
    setSelfInfo()
    clearPage();
    //设置列表
    $.getJSON('/su/php/notice/notice.php?code=10220', function (data){
        $('#paging').paging({
            nowPage: 1,
            allPages: Math.ceil(data.length/1),
            displayPage: 5,
            callBack: function (now) {
                var currentPages = now * 1 <  data.length ? 1 : data.length - (now - 1) * 1;
                var _html = '';
                for (var i = 0; i < currentPages; i++) {
                    var num = (now - 1) * 1 + i;
                    _html += ' <tr id="item'+data[num].id+'">\n' +
                        '                                            <td>'+data[num].title+'</td>\n' +
                        '                                            <td>'+data[num].user_name+'</td>\n' +
                        '                                            <td>'+data[num].date+'</td>\n' +
                        '                                            <td>\n' +
                        '                                                <div class="tpl-table-black-operation">\n' +
                        '                                                    <a onclick="deleteData('+data[num].id+')" class="tpl-table-black-operation-del">\n' +
                        '                                                        <i class="am-icon-trash"></i> 删除\n' +
                        '                                                    </a>\n' +
                        '                                                </div>\n' +
                        '                                            </td>\n' +
                        '                                        </tr>';
                }
                $('#resultBox').html(_html);
            }
        });
    });
});


function search() {
    clearPage();
    var key = $("#key").val();
    //设置列表
    $.getJSON('/su/php/notice/notice.php?code=10225&key='+key, function (data){
        $('#paging').paging({
            nowPage: 1,
            allPages: Math.ceil(data.length/1),
            displayPage: 5,
            callBack: function (now) {
                var currentPages = now * 1 <  data.length ? 1 : data.length - (now - 1) * 1;
                var _html = '';
                for (var i = 0; i < currentPages; i++) {
                    var num = (now - 1) * 1 + i;
                    _html += ' <tr id="item"+data[num].id>\n' +
                        '                                            <td>'+data[num].title+'</td>\n' +
                        '                                            <td>'+data[num].author+'</td>\n' +
                        '                                            <td>'+data[num].date+'</td>\n' +
                        '                                            <td>\n' +
                        '                                                <div class="tpl-table-black-operation">\n' +
                        '                                                    <a onclick="deleteData('+data[num].id+')" class="tpl-table-black-operation-del">\n' +
                        '                                                        <i class="am-icon-trash"></i> 删除\n' +
                        '                                                    </a>\n' +
                        '                                                </div>\n' +
                        '                                            </td>\n' +
                        '                                        </tr>';
                }
                $('#resultBox').html(_html);
            }
        });
    });
}

function deleteData(id){
    var b = confirm("是否删除该记录");
    if(b){
        $.get('/su/php/notice/notice.php?code=10223&id='+id,function (data) {
            if(data == 1){
                $("#item"+id).empty();
            }else if(data == 0){
                alert("删除失败");
            }
        });
    }
}