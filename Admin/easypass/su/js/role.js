let email = "";
let name = "";
let mark = "";
$(function() {
    setSelfInfo();
    clearPage();
    //设置列表
    $.getJSON('/su/php/role.php?code=10104', function (data){
        $('#paging').paging({
            nowPage: 1,
            allPages: Math.ceil(data.length/1),
            displayPage: 5,
            callBack: function (now) {
                var currentPages = now * 1 <  data.length ? 1 : data.length - (now - 1) * 1;
                var _html = '';
                for (var i = 0; i < currentPages; i++) {
                    var num = (now - 1) * 1 + i;
                    _html += _html ='<tr class="even gradeC" id="item'+data[num].id+'">\n' +
                        '        <td>'+ data[num].prov + data[num].city+data[num].dist+ '</td>\n' +
                        '        <td>区域管理员</td>\n' +
                        '        <td>'+ data[num].login_name +'</td>\n' +
                        '        <td>' + data[num].user_name + '</td>\n' +
                        '        <td>\n' +
                        '        <div class="tpl-table-black-operation">\n' +
                        '        <a href="javascript:;">\n' +
                        '        <i class="am-icon-bars"></i>  详情\n' +
                        '        </a>\n' +
                        '        <a href="javascript:;" onclick="reset('+data[num].account_id +')" class="tpl-table-black-operation-waring">\n' +
                        '        <i class="am-icon-recycle"></i>  重置\n' +
                        '        </a>\n' +
                        '        <a href="javascript:;" onclick="deleteData('+data[num].id +')" class="tpl-table-black-operation-del">\n' +
                        '        <i class="am-icon-trash"></i>  删除\n' +
                        '        </a>\n' +
                        '        </div>\n' +
                        '        </td>\n' +
                        '        </tr>'
                }
                $('#resultBox').html(_html);
            }
        });
    });


    $("#address").address({
        prov: "",
        city: "",
        district: "",
        scrollToCenter: true,
        footer: true,
        selectEnd: function(data) {
            mark = data.id;
        }
    });


});
function add()
{

    $("#address").find("input").val("");
    $('#name').val("");
    $('#email').val("");
    $('#addRole').modal({
        relatedTarget: this,
        onConfirm: function(e) {

            name = $("#name").val();
            email = $("#email").val();
            if(mark===""||name==""||email==""){
                alert("前完善信息！");
            }else
            {
                $.post('/su/php/role.php?code=10107',{
                    area_code:mark,
                }, function (data) {
                    if(data == 0) {
                        alert("该区域还未添加，请到区域管理模块添加该区域后再次尝试创建该区域管理员！");
                    }else{
                        $.post('/su/php/role.php?code=10100',{
                            area_code:mark,
                            user_name:name,
                            email:email,
                        }, function (data) {
                            if(data == -1) {
                                alert("邮箱已被注册！！！");
                            }
                            else{
                                alert("创建账号为："+data+"\n默认密码：666666"+"\n如果忘记账号可以通过邮箱找回，或者通过询问超级管理员获取。");
                                window.location.reload();
                            }
                        });
                    }


                });

            }
        },
        onCancel: function(e) {
            mark = "";
        }
    });
}


function deleteData(id)
{
    var b = confirm("⚠：是否删除该管理员");
    if(b){
        $.get('/su/php/role.php?code=10103&id='+id,function (data) {
            if(data==='1'){
                $("#item"+id).empty();
            }else if(data === '0'){
                alert("删除失败");
            }
        });
    }
}

function reset(id)
{
    var b = confirm("⚠：是否重置密码");
    if(b){
        $.get('/su/php/role.php?code=10106&id='+id,function (data) {
            if(data==='1'){
                alert("默认密码为666666");
            }else if(data === '0'){
                alert("失败。可能密码是666666");
            }
        });
    }
}