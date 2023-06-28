$(function () {
    setSelfInfo();
    clearPage();
    var area_id = getCookie("area_id");
    //设置列表
    $.getJSON('/area/php/notice/notice.php?code=10220&area_id='+area_id, function (data){
       console.log(data);
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
                        '                                                <div class="tpl-table-black-operation">\n';
                   if(data[num].area_id!=-1){
                                               _html += '                                                    <a onclick="deleteData('+data[num].id+')" class="tpl-table-black-operation-del">\n' +
                                                             '                                                        <i class="am-icon-trash"></i> 删除\n' +
                              '                                                    </a>\n';

		     }
                    _html +='                                                </div>\n' +
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
    var area_id = getCookie("area_id");
    //设置列表
    $.getJSON('/area/php/notice/notice.php?code=10225&area_id='+area_id +'&key='+key, function (data){
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
                        '                                                <div class="tpl-table-black-operation">\n';
                   if(data[num].area_id!=-1){
                                               _html += '                                                    <a onclick="deleteData('+data[num].id+')" class="tpl-table-black-operation-del">\n' +
                                                             '                                                        <i class="am-icon-trash"></i> 删除\n' +
                              '                                                    </a>\n';

		     }
                    _html +='                                                </div>\n' +
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
    var area_id = getCookie("area_id");
    if(b){
        $.get('/area/php/notice/notice.php?code=10223&id='+id+'&area_id='+area_id, function (data) {
            if(data == 1){
                $("#item"+id).empty();
            }else if(data == 0){
                alert("删除失败");
            }
        });
    }
}