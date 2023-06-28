let flag = 0;
let area_id = 0;
let community_name = "";
let community_address = "";
$(function () {
    setSelfInfo();
    area_id = getCookie("area_id");
    clearPage();
    //设置列表
    $.getJSON('/area/php/community.php?code=10144&area_id='+area_id, function (data){
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
                        '                                        <td><input  id="community-name'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="小区名称..." value="'+ data[num].community_name +'"  readonly></td>\n' +
                        '                                        <td>'+data[num].address+'</td>\n' +
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
            '                                        <td><input  id="community-name" class="tpl-header-search-box" type="text" placeholder="小区名称..." value=""  ></td>\n' +
            '                                        <td><input id="community-address" class="tpl-header-search-box" type="text" placeholder="小区地址..." value=""  ></td>\n' +
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

    area_id = getCookie("area_id");
    community_name = $("#community-name").val();
    community_address = $("#community-address").val();

    if(community_name=='' || community_address == '' ){
        alert("操作失败，请重新操作！");
    }
    else {
        $.post('/area/php/community.php?code=10140',{
            area_id:area_id,
            community_name:community_name,
            address:community_address,
        }, function (data) {
            if(data==='1') {
                alert('保存成功');
                window.location.href = 'community.html';
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


function search() {
    clearPage();
    var key = $("#key").val();
    clearPage();
    //设置列表
    $.getJSON('/area/php/community.php?code=10147&key='+key, function (data){
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
                        '                                        <td><input  id="community-name'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="小区名称..." value="'+ data[num].community_name +'"  readonly></td>\n' +
                        '                                        <td><input id="community-address'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="小区地址..." value="'+ data[num].address +'"  readonly></td>\n' +
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
}

function deleteData(id){
    var b = confirm("⚠：删除该小区会导致该区域下其他数据全部丢失，是否删除该记录");
    if(b){
        $.get('/area/php/community.php?code=10143&id='+id,function (data) {
            if(data==='1'){
                $("#item"+id).empty();
            }else if(data === '0'){
                alert("删除失败");
            }
        });
    }
}

