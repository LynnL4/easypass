$(function() {

    $('#add').click(function () {
        viewAdd();
    });
});

function viewAdd() {
    _html =  ' <tr class="even gradeC">\n' +
        '                                            <td id="address"><input readonly type="text" name="nickname" class="am-form-field am-radius" placeholder="请选择地址" required="" value="" ></td>\n' +
        '                                            <td><input class="am-form-field am-radius"></td>\n' +
        '                                            <td>A0001</td>\n' +
        '                                            <td>李天然</td>\n' +
        '                                            <td>\n' +
        '                                                <div class="tpl-table-black-operation">\n' +
        '                                                    <a href="javascript:;">\n' +
        '                                                        <i class="am-icon-bars"></i>  详情\n' +
        '                                                    </a>\n' +
        '                                                    <a href="javascript:;">\n' +
        '                                                        <i class="am-icon-pencil"></i> 编辑\n' +
        '                                                    </a>\n' +
        '                                                    <a href="javascript:;" class="tpl-table-black-operation-del">\n' +
        '                                                        <i class="am-icon-trash"></i> 删除\n' +
        '                                                    </a>\n' +
        '                                                </div>\n' +
        '                                            </td>\n' +
        '                                        </tr>';
    $('#list').prepend(_html);

    //	带底部的
    $("#address").address({
         prov: "",
         city: "",
         district: "",
         scrollToCenter: true,
         footer: true,
         selectEnd: function(json) {
             console.log(json);
         }
    });

}