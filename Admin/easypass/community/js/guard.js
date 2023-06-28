let flag = 0;
let community_id = 0;
let description= "";


$(function () {
    setSelfInfo();
    community_id = getCookie("community_id");
    clearPage();
    //设置列表
    $.getJSON('/community/php/guard.php?code=10144&community_id='+community_id, function (data){

        $('#paging').paging({
            nowPage: 1,
            allPages: Math.ceil(data.length/1),
            displayPage: 5,
            callBack: function (now) {
                var currentPages = now * 1 <  data.length ? 1 : data.length - (now - 1) * 1;
                var _html = '';
                for (var i = 0; i < currentPages; i++) {
                    var num = (now - 1) * 1 + i;
                    _html += '<tr id="item'+ data[num].id +'">\n' +
                        '                                        <td><input  id="id'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="编号" value="'+ data[num].id +'"  readonly></td>\n' +
                        '                                        <td><input id="description'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="描述" value="'+ data[num].description +'"  readonly></td>\n' +
                        '                                        <td>\n' +
                        '                                            <div class="tpl-table-black-operation">\n' +
                        '                                                <a onclick="deleteData('+ data[num].id +')" class="tpl-table-black-operation-del ">\n' +
                        '                                                    <i class="am-icon-trash"></i> 删除\n' +
                        '                                                </a>\n' +
                        '                                            </div>\n' +
                        '                                        </td>\n' +
                        '                                    </tr>'
                }
                $('#resultBox').html(_html);
            }
        });
    });
});

function add() {
    if(!flag){
        var _html ='<tr id="item">\n' +
            '                                        <td><input  id="id" class="tpl-header-search-box" type="text" placeholder="编号" value=""  readonly></td>\n' +
            '                                        <td><input id="description" class="tpl-header-search-box" type="text" placeholder="描述" value=""  ></td>\n' +
            '                                        <td>\n' +
            '                                            <div class="tpl-table-black-operation">\n' +
            '                                                <a onclick="save()" class="tpl-table-black-operation ">\n' +
            '                                                    <i class="am-icon-save"></i>保存\n' +
            '                                                </a>\n' +
            '                                                <a onclick="cancel()" class="tpl-table-black-operation-del ">\n' +
            '                                                    <i class="am-icon-trash"></i>取消\n' +
            '                                                </a>\n' +
            '                                            </div>\n' +
            '                                        </td>\n' +
            '                                    </tr>'
        $("#resultBox").prepend(_html);

        flag = 1;
    }else{
        alert("请先保存当前操作！");
    }
}

function save() {

    community_id = getCookie("community_id");
    description = $("#description").val();


    if(description==''){
        alert("操作失败，请重新操作！");
    }
    else {
        $.post('/community/php/guard.php?code=10140',{
            community_id:community_id,
            description:description
        }, function (data) {
            if(data==='1') {
                alert('保存成功');
                window.location.href = 'guard.html';
            }
            else if(data === '0')
                alert('出现未知错误，发布失败');
            else
                alert(data);
        });
    }
}

function cancel(){
    $("#item").remove();
    flag = 0;
}
function deleteData(id){
    var b = confirm("⚠：删除该门禁将导致运行中的门禁系统失效，是否删除");
    if(b){
        $.get('/community/php/guard.php?code=10141&guard_id='+id,function (data) {
            if(data==='1'){
                $("#item"+id).empty();
            }else if(data === '0'){
                alert("删除失败");
            }
        });
    }
}
