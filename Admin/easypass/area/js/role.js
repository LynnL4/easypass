let email = "";
let name = "";
let mark = "";
let area_id = -2;
let community_id = -2;
$(function() {
    setSelfInfo();
    area_id = getCookie("area_id");
    $.getJSON('/area/php/community.php?code=10144&area_id='+area_id,
        function (data) {
            var _options = "";
            for(let i = 0; i < data.length; i++){
                _options += '  <option value="'+ data[i].id +'"> '+ data[i].community_name +'</option>\n';
            }
            $('#community').html(_options);
        }
    );



    var $selected = $('#community');

    $selected.on('change', function() {
       community_id = $(this).val();
    });


    clearPage();
    //设置列表
    area_id = getCookie("area_id");
    $.getJSON('/area/php/role.php?code=10104&area_id='+ area_id, function (data){
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
                        '        <td>'+ data[num].community_name+ '</td>\n' +
                        '        <td>小区管理员</td>\n' +
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




});
function add()
{
    $('#name').val("");
    $('#email').val("");
    $('#addRole').modal({
        relatedTarget: this,
        onConfirm: function(e) {

            name = $("#name").val();
            email = $("#email").val();
            if(community_id === -2||name==""||email==""){
                alert("前完善信息！");
            }else
            {
                $.post('/area/php/role.php?code=10100',{
                    community_id:community_id,
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
        $.get('/area/php/role.php?code=10103&id='+id,function (data) {
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
        $.get('/area/php/role.php?code=10106&id='+id,function (data) {
            if(data==='1'){
                alert("默认密码为666666");
            }else if(data === '0'){
                alert("失败。可能密码是666666");
            }
        });
    }
}