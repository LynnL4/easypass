let flag = 0;
let area_code = "";
let prov = "";
let city = "";
let dist = "";


$(function () {
    setSelfInfo();
    clearPage();
    //设置列表
    $.getJSON('/su/php/area/area.php?code=10134', function (data){
        $('#paging').paging({
            nowPage: 1,
            allPages: Math.ceil(data.length/1),
            displayPage: 5,
            callBack: function (now) {
                var currentPages = now * 1 <  data.length ? 1 : data.length - (now - 1) * 1;
                var _html = '';
                for (var i = 0; i < currentPages; i++) {
                    var num = (now - 1) * 1 + i;
                    _html += _html = '<tr id="item'+data[num].id+'">\n'+
                        '                                            <td>'+data[num].area_code+'</td>\n' +
                        '                                            <td  id="address" >\n' +
                        '                                               '+data[num].prov+data[num].city+data[num].dist+'\n'+
                        '                                            </td>\n' +
                        '                                            <td>\n' +
                        '                                                <div class="tpl-table-black-operation">\n' +
                        '                                                    <a href="javascript:;" onclick="">\n' +
                        '                                                        <i class="am-icon-bars"></i> 详情\n' +
                        '                                                    </a>\n' +
                        '                                                    <a href="javascript:;" onclick="deleteData('+data[num].id+')" class="tpl-table-black-operation-del">\n' +
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

function add() {
    if(!flag){
        var _html = '<tr id="addArea">\n'+
            '                                            <td id="id"></td>\n' +
            '                                            <td  id="address" >\n' +
            '                                                <input readonly type="text" name="nickname" class="am-form-field am-radius" placeholder="请选择地址" required="" value="" >\n' +
            '                                            </td>\n' +
            '                                            <td>\n' +
            '                                                <div class="tpl-table-black-operation">\n' +
            '                                                    <a href="javascript:;" onclick="save()">\n' +
            '                                                        <i class="am-icon-save"></i> 保存\n' +
            '                                                    </a>\n' +
            '                                                    <a href="javascript:;" onclick="cancel()" class="tpl-table-black-operation-del">\n' +
            '                                                        <i class="am-icon-trash"></i> 取消\n' +
            '                                                    </a>\n' +
            '                                                </div>\n' +
            '                                            </td>\n' +
            '                                        </tr>';
        $("#resultBox").prepend(_html);


        $("#address").address({
            prov: "广东省",
            city: "肇庆市",
            district: "端州区",
            scrollToCenter: true,
            footer: true,
            selectEnd: function(data) {
               $("#id").html(data.id);
               area_code = data.id;
               prov = data.prov;
               city = data.city;
               dist = data.district;
            }
        });


        flag = 1;
    }else{
        alert("请先保存当前操作！");
    }
}

function save() {
    if(area_code=='' || prov == '' || city=='' || dist == ''){
        alert("操作失败，请重新操作！");
    }
    else {
        $.post('/su/php/area/area.php?code=10130',{
            area_code:area_code,
            prov:prov,
            city:city,
            dist:dist
        }, function (data) {
            if(data==='1') {
                alert('保存成功');
                window.location.href = 'area.html';
            }
            else if(data === '0')
                alert('出现未知错误，发布失败');
            else
                alert('该区域已经存在，请勿重复添加！');
        });
    }
}

function cancel(){
    $("#addArea").remove();
    mark = "";
    prov = "";
    city = "";
    dist = "";
    flag = 0;
}

function search() {
    clearPage();
    var key = $("#key").val();
    //设置列表
    $.getJSON('/su/php/area/area.php?code=10135&key='+key, function (data){
        $('#paging').paging({
            nowPage: 1,
            allPages: Math.ceil(data.length/1),
            displayPage: 5,
            callBack: function (now) {
                var currentPages = now * 1 <  data.length ? 1 : data.length - (now - 1) * 1;
                var _html = '';
                for (var i = 0; i < currentPages; i++) {
                    var num = (now - 1) * 1 + i;
                    _html += _html = '<tr id="item'+data[num].id+'">\n'+
                        '                                            <td>'+data[num].area_code+'</td>\n' +
                        '                                            <td  id="address" >\n' +
                        '                                               '+data[num].prov+data[num].city+data[num].dist+'\n'+
                        '                                            </td>\n' +
                        '                                            <td>\n' +
                        '                                                <div class="tpl-table-black-operation">\n' +
                        '                                                    <a href="javascript:;" onclick="">\n' +
                        '                                                        <i class="am-icon-pencil"></i> 详情\n' +
                        '                                                    </a>\n' +
                        '                                                    <a href="javascript:;" onclick="deleteData('+data[num].id+')" class="tpl-table-black-operation-del">\n' +
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
    var b = confirm("⚠：删除该区域会导致该区域下其他数据全部丢失，是否删除该记录");
    if(b){
        $.get('/su/php/area/area.php?code=10133&id='+id,function (data) {
            if(data==='1'){
                $("#item"+id).empty();
            }else if(data === '0'){
                alert("删除失败");
            }
        });
    }
}

