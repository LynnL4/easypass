let flag = 0;
let community_id = 0;
let building = "";
let floor= -1;
let number = "";

$(function () {
    setSelfInfo();
    community_id = getCookie("community_id");

    getList(0)

    var $selected = $('#state-list');

    $selected.on('change', function() {
        getList($(this).val());
    });

});

function add() {
    if(!flag){
        var _html = '<tr id="item">\n' +
            '                                        <td><input  id="building" class="tpl-header-search-box" type="text" placeholder="建筑" value=""  ></td>\n' +
            '                                        <td><input id="floor" class="tpl-header-search-box" type="digtial" placeholder="楼层" value=""  ></td>\n' +
            '                                        <td><input id="number" class="tpl-header-search-box" type="text" placeholder="门牌" value=""  ></td>\n' +
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
            '                                    </tr>';
        $("#resultBox").prepend(_html);



        flag = 1;
    }else{
        alert("请先保存当前操作！");
    }
}



function search() {
    var key = $("#key").val();
    var community_id = getCookie("community_id");
    clearPage();
    //设置列表
    $.getJSON('/community/php/auth.php?code=101630&community_id='+community_id+'&key=' + key, function (data){
        $('#paging').paging({
            nowPage: 1,
            allPages: Math.ceil(data.length/1),
            displayPage: 5,
            callBack: function (now) {
                var currentPages = now * 1 <  data.length ? 1 : data.length - (now - 1) * 1;
                var _html = '';
                for (var i = 0; i < currentPages; i++) {
                    var num = (now - 1) * 1 + i;

                    if(data[num].state == 0){
                        var stateQ = "已认证"
                    }else if(data[num].state == 1){
                        var stateQ = "认证中"
                    }else {
                        var stateQ = "已驳回"
                    }
                    var residence = "单位：" + data[num].building +" 楼层：" + data[num].floor +" 门牌：" + data[num].number;

                    _html += '<tr id="item'+ data[num].id +'">\n' +
                        '                                        <td><input  id="state'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="状态" value="' + stateQ+ '"  readonly></td>\n' +
                        '                                        <td><input id="floor'+ data[num].id +'" class="tpl-header-search-box" type="digtial" placeholder="业主编码" value="'+ data[num].login_name +'"  readonly></td>\n' +
                        '                                        <td><input id="number'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="门牌" value="'+ residence +'"  readonly></td>\n' ;

                    if(data[num].state == 0){
                        _html +=                         '                                        <td>\n' +
                            '                                            <div class="tpl-table-black-operation">\n' +
                            '                                                <a onclick="deleteData('+ data[num].id +')" class="tpl-table-black-operation-del ">\n' +
                            '                                                    <i class="am-icon-trash"></i> 删除\n' +
                            '                                                </a>\n' +
                            '                                            </div>\n' +
                            '                                        </td>\n' +
                            '                                    </tr>';
                    }else if(data[num].state == 1){
                        _html +=                         '                                        <td>\n' +
                            '                                            <div class="tpl-table-black-operation">\n' +
                            '                                                <a onclick="pass('+ data[num].id +')" class="tpl-table-black-operation">\n' +
                            '                                                    <i class="am-icon-check"></i> 通过\n' +
                            '                                                </a>\n' +
                            '                                                <a onclick="reject('+ data[num].id +')" class="tpl-table-black-operation-del ">\n' +
                            '                                                    <i class="am-icon-trash"></i> 驳回\n' +
                            '                                                </a>\n' +
                            '                                            </div>\n' +
                            '                                        </td>\n' +
                            '                                    </tr>';
                    }else {
                        _html +=                         '                                        <td>\n' +
                            '                                            <div class="tpl-table-black-operation">\n' +
                            '                                                <a onclick="detial('+ data[num].id +')" class="tpl-table-black-operation">\n' +
                            '                                                    <i class="am-icon-check"></i> 详情\n' +
                            '                                                </a>\n' +
                            '                                            </div>\n' +
                            '                                        </td>\n' +
                            '                                    </tr>';
                    }

                }
                $('#resultBox').html(_html);
            }
        });
    });

}

function deleteData(id){
    var b = confirm("⚠：删除该小区会导致该区域下其他数据全部丢失，是否删除该记录");
    if(b){
        $.get('/community/php/auth.php?code=10162&proprietor_id='+id,function (data) {
            if(data==='1'){
                $("#item"+id).empty();
            }else if(data === '0'){
                alert("删除失败");
            }
        });
    }
}


function getList(state)
{

    var community_id = getCookie("community_id");
    if(state == 0){
        var stateQ = "已认证"
    }else if(state == 1){
        var stateQ = "认证中"
    }else {
        var stateQ = "已驳回"
    }
    clearPage();
    //设置列表
    $.getJSON('/community/php/auth.php?code=10160&community_id='+community_id+'&state=' + state, function (data){
        $('#paging').paging({
            nowPage: 1,
            allPages: Math.ceil(data.length/1),
            displayPage: 5,
            callBack: function (now) {
                var currentPages = now * 1 <  data.length ? 1 : data.length - (now - 1) * 1;
                var _html = '';
                for (var i = 0; i < currentPages; i++) {
                    var num = (now - 1) * 1 + i;

                    var residence = "单位：" + data[num].building +" 楼层：" + data[num].floor +" 门牌：" + data[num].number;

                    _html += '<tr id="item'+ data[num].id +'">\n' +
                        '                                        <td><input  id="state'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="状态" value="' + stateQ+ '"  readonly></td>\n' +
                        '                                        <td><input id="floor'+ data[num].id +'" class="tpl-header-search-box" type="digtial" placeholder="业主编码" value="'+ data[num].login_name +'"  readonly></td>\n' +
                        '                                        <td>\n' +
                        '                                            <img class="am-circle" src="' + data[num].avaurl + '" width="30" height="30" id="user' + data[num].id + '" onmouseover="$(\'#user' + data[num].id + '\').popover({\n' +
                        '                        content: \' ' + data[num].login_name + '\',\n' +
                        '                        trigger: \'hover\'\n' +
                        '                    });"/>\n' +
                        '                                            ' + data[num].user_name + '\n' +
                        '                                        </td>\n' +
                        '                                        <td><input id="number'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="门牌" value="'+ residence +'"  readonly></td>\n' ;

                    if(state == 0){
                        _html +=                         '                                        <td>\n' +
                            '                                            <div class="tpl-table-black-operation">\n' +
                            '                                                <a onclick="deleteData('+ data[num].id +')" class="tpl-table-black-operation-del ">\n' +
                            '                                                    <i class="am-icon-trash"></i> 删除\n' +
                            '                                                </a>\n' +
                            '                                            </div>\n' +
                            '                                        </td>\n' +
                            '                                    </tr>';
                    }else if(state == 1){
                        _html +=                         '                                        <td>\n' +
                            '                                            <div class="tpl-table-black-operation">\n' +
                            '                                                <a onclick="pass('+ data[num].id +')" class="tpl-table-black-operation">\n' +
                            '                                                    <i class="am-icon-check"></i> 通过\n' +
                            '                                                </a>\n' +
                            '                                                <a onclick="pass('+ data[num].id +')" class="tpl-table-black-operation-del ">\n' +
                            '                                                    <i class="am-icon-trash"></i> 驳回\n' +
                            '                                                </a>\n' +
                            '                                            </div>\n' +
                            '                                        </td>\n' +
                            '                                    </tr>';
                    }else {
                        _html +=                         '                                        <td>\n' +
                            '                                            <div class="tpl-table-black-operation">\n' +
                            '                                                <a onclick="detial('+ data[num].id +')" class="tpl-table-black-operation">\n' +
                            '                                                    <i class="am-icon-check"></i> 详情\n' +
                            '                                                </a>\n' +
                            '                                            </div>\n' +
                            '                                        </td>\n' +
                            '                                    </tr>';
                    }

                }
                $('#resultBox').html(_html);
            }
        });
    });
}

function pass(id) {
    console.log(id);
    $.getJSON('/community/php/auth.php?code=10161&proprietor_id=' + id, function (data) {
        if(data == 1){
            window.location.reload();
        }else {
            alert("操作失败");
        }
    });
}
