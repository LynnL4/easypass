let flag = 0;
let community_id = 0;
let building = "";
let floor= -1;
let number = "";

$(function () {
    setSelfInfo();
    community_id = getCookie("community_id");
    clearPage();
    //设置列表
    $.getJSON('/community/php/residence.php?code=10144&community_id='+community_id, function (data){
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
                        '                                        <td><input  id="building'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="建筑" value="'+ data[num].building +'"  readonly></td>\n' +
                        '                                        <td><input id="floor'+ data[num].id +'" class="tpl-header-search-box" type="digtial" placeholder="楼层" value="'+ data[num].floor +'"  readonly></td>\n' +
                        '                                        <td><input id="number'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="门牌" value="'+ data[num].number +'"  readonly></td>\n' +
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

function save() {

    community_id = getCookie("community_id");
    building = $("#building").val();
    floor = $("#floor").val();
    number = $("#number").val();

    if(building=='' || floor == '' || number == ""){
        alert("操作失败，请重新操作！");
    }
    else {
        $.post('/community/php/residence.php?code=10140',{
            community_id:community_id,
            building: building,
            floor: floor,
            number: number
        }, function (data) {
            if(data==='1') {
                alert('保存成功');
                window.location.href = 'residence.html';
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
    var key = $("#key").val();
    community_id = getCookie("community_id");
    clearPage();
    //设置列表
    $.getJSON('/community/php/residence.php?code=10145&community_id='+community_id + '&key='+key, function (data){
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
                        '                                        <td><input  id="building'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="建筑" value="'+ data[num].building +'"  readonly></td>\n' +
                        '                                        <td><input id="floor'+ data[num].id +'" class="tpl-header-search-box" type="digtial" placeholder="楼层" value="'+ data[num].floor +'"  readonly></td>\n' +
                        '                                        <td><input id="number'+ data[num].id +'" class="tpl-header-search-box" type="text" placeholder="门牌" value="'+ data[num].number +'"  readonly></td>\n' +
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
        $.get('/community/php/residence.php?code=10143&id='+id,function (data) {
            if(data==='1'){
                $("#item"+id).empty();
            }else if(data === '0'){
                alert("删除失败");
            }
        });
    }
}

