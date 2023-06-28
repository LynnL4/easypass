let mode = null;
let guard_id = null;
let state = null;
let start_Date = null;
let end_Date = null;

$(function () {
    setSelfInfo();
    var guard_id = getCookie("guard_id");
    var community_id = getCookie("community_id");

    $.getJSON('/guard/php/guard.php?code=10144&community_id='+community_id, function (data) {
        for(var i=0; i < data.length; i++){
            $('#guard-list').append('<option value="'+ data[i].id +'">'+ data[i].id +'</option>');
        }
        if(guard_id){
            $('#guard-list').val(guard_id);
        }
    });


    $('#guard-list').selected({
        btnWidth: '300px',
        btnSize: 'sm',
        btnStyle: 'primary',
        maxHeight: '100px'
    });


    $('#guard-list').on('change', function() {
        getLsit();
    });


    $('#mode-list').on('change', function() {
        getLsit();
    });

    $('#state-list').on('change', function() {
        getLsit();
    });


    var startDate = new Date();
    var endDate = new Date();
    $('#my-startDate').text(startDate.getFullYear() + '-' + (1+startDate.getMonth()) + '-' + (startDate.getDate()-1));
    $('#my-endDate').text(endDate.getFullYear() + '-' + (1+endDate.getMonth()) + '-' + (endDate.getDate()+1));
    var $alert = $('#my-alert');
    $('#my-start').datepicker().
    on('changeDate.datepicker.amui', function(event) {
        if (event.date.valueOf() > endDate.valueOf()) {
            $alert.find('p').text('开始日期应小于结束日期！').end().show();
        } else {
            $alert.hide();
            startDate = new Date(event.date);
            $('#my-startDate').text($('#my-start').data('date'));
            getLsit();
        }
        $(this).datepicker('close');
    });

    $('#my-end').datepicker().
    on('changeDate.datepicker.amui', function(event) {
        if (event.date.valueOf() < startDate.valueOf()) {
            $alert.find('p').text('结束日期应大于开始日期！').end().show();
        } else {
            $alert.hide();
            endDate = new Date(event.date);
            $('#my-endDate').text($('#my-end').data('date'));
            getLsit();
        }
        $(this).datepicker('close');
    });

});

function getLsit() {
    mode = $('#mode-list').val();
    guard_id = $('#guard-list').val();
    state = $('#state-list').val();
    start_Date = $('#my-startDate').text();
    end_Date =$('#my-endDate').text();
    clearPage();
    //设置列表
    $.getJSON('/guard/php/record.php?code=10150',
        {
            mode:mode,
            guard_id:guard_id,
            state:state,
            start:start_Date,
            end:end_Date,
        },
        function (data){

        $('#paging').paging({
            nowPage: 1,
            allPages: Math.ceil(data.length/10),
            displayPage: 5,
            callBack: function (now) {
                var currentPages = now * 10 <  data.length ? 10 : data.length - (now - 1) * 10;
                var _html = '';
                for (var i = 0; i < currentPages; i++) {
                    var num = (now - 1) * 10 + i;

                    if(data[num].mode == 0){
                        var mode_text = "业主";
                    }else {
                        var mode_text = "访客";
                    }


                    _html += '<tr>\n' +
                        '                                        <td>' + data[num].toward + '</td>\n' +
                        '                                        <td>\n' +
                        '                                            <img class="am-circle" src="' + data[num].avaurl + '" width="30" height="30" id="user' + data[num].id + '" onmouseover="$(\'#user' + data[num].id + '\').popover({\n' +
                        '                        content: \' ' + data[num].user_name + '\',\n' +
                        '                        trigger: \'hover\'\n' +
                        '                    });"/>\n' +
                        '                                            ' + data[num].login_name + '\n' +
                        '                                        </td>\n' +
                        '                                        <td>'+mode_text+'</td>\n' +
                        '                                        <td> ' + data[num].record_time + '</td>\n';

                    if(data[num].state == 0){
                        _html += '                                        <td>\n' +
                            '                                            <button class="am-btn am-btn-success" style="padding: 5px; width: 80%;"\n' +
                            '                                                   id = "state' + data[num].id + '" onmouseover="$(\'#state' + data[num].id + '\').popover({\n' +
                            '                        content: \'' + data[num].description + '\',\n' +
                            '                        trigger: \'hover\'\n' +
                            '                    })">\n' +
                            '                                                     成功\n' +
                            '                                            </button>\n' +
                            '                                        </td>\n' +
                            '                                    </tr>';
                    }else
                    {
                                _html += '                                        <td>\n' +
                            '                                            <button class="am-btn am-btn-danger" style="padding: 5px; width: 80%;"\n' +
                            '                                                   id = "state' + data[num].id + '" onmouseover="$(\'#state' + data[num].id + '\').popover({\n' +
                            '                        content: \'' + data[num].description + '\',\n' +
                            '                        trigger: \'hover\'\n' +
                            '                    })">\n' +
                            '                                                     失败\n' +
                            '                                            </button>\n' +
                            '                                        </td>\n' +
                            '                                    </tr>';
                    }



                }
                $('#resultBox').html(_html);
            }
        });
    });
}