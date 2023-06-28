$(function () {
    setSelfInfo();
    var guard_id = getCookie("guard_id");
    var community_id = getCookie("community_id");


    var selected = $('#state-list');

    $.getJSON('/guard/php/guard.php?code=10144&community_id='+community_id, function (data) {
        for(var i=0; i < data.length; i++){
            selected.append('<option value="'+ data[i].id +'">'+ data[i].id +'</option>');
        }
        if(guard_id){
            selected.val(guard_id);
        }
    });


    selected.selected({
        btnWidth: '300px',
        btnSize: 'sm',
        btnStyle: 'primary',
        maxHeight: '100px'
    });


    selected.on('change', function() {
        guard($(this).val());
    });



});

function guard(guard_id) {

    $.getJSON('/guard/php/guard.php?code=10142&guard_id='+guard_id, function (data) {
        var guard_id = getCookie("guard_id");
        var _html = '';
            _html += '<tr id="item' + data[0].id + '">\n' +
                '                                        <td><input  id="id' + data[0].id + '" class="tpl-header-search-box" type="text" placeholder="编号" value="' + data[0].id + '"  readonly></td>\n' +
                '                                        <td><input id="description' + data[0].id + '" class="tpl-header-search-box" type="text" placeholder="描述" value="' + data[0].description + '"  readonly></td>\n';
            if(data[0].id == guard_id){
                _html += '                                        <td>\n'+
                    '                                            <div class="tpl-table-black-operation">\n' +
                    '                                                <a onclick="stop(' + data[0].id + ')" class="tpl-table-black-operation-del">\n' +
                    '                                                    <i class="am-icon-close"></i> 关闭\n' +
                    '                                                </a>\n' +
                    '                                            </div>\n' +
                    '                                        </td>\n' +
                    '                                    </tr>';
            }else{
                _html += '                                        <td>\n'+
                    '                                            <div class="tpl-table-black-operation">\n' +
                    '                                                <a onclick="start(' + data[0].id + ')" class="tpl-table-black-operation ">\n' +
                    '                                                    <i class="am-icon-openid"></i> 开启\n' +
                    '                                                </a>\n' +
                    '                                            </div>\n' +
                    '                                        </td>\n' +
                    '                                    </tr>';
            }


        $('#resultBox').html(_html);
    });
}

function start(guard_id)
{
    setCookie("guard_id", guard_id);
    window.location.reload();
}
function stop(){
    clearCookie("guard_id");
    window.location.reload();
}