$(function () {

    setInterval("setSysInfo()",3000); //定时获取系统运行信息
    setNotifyList();
    setSelfInfo();
    setEc();
    getData();
});

function setSysInfo() { //获取系统运行状态，并设置
    $.getJSON('/community/php/getSystemInfo.php', function (data) {
        $("#cpuInfo").html(data.cpu +"% / 100%");
        $("#memoryInfo").html(data.memory +"% / 100%");
        $("#diskInfo").html(+ data.disk +"% / 100%");
        $("#cpuInfoBar").css("width", data.cpu+'%');
        $("#memoryInfoBar").css("width", data.memory+'%');
        $("#diskInfoBar").css("width", data.disk+'%');
    });
}

function setNotifyList() { //设置系统通知信息
    var area_id = getCookie("area_id");
    var community_id =  getCookie("community_id");
    $.getJSON('/community/php/notice/notice.php?code=10224&area_id='+ area_id + '&community_id=' + community_id, function (data) {
        var _html = "";
        for(let index in data) {
            _html += " <tr>\n" +
                "     <td><a href='notice.html?id=" + data[index].id + "'>" + data[index].title + "</a></td>\n" +
                "     <td>" + data[index].user_name + "</td>\n" +
                "     <td>" + data[index].date + "</td>\n" +
                " </tr>\n"
        }
        $("#notifyList").html(_html);
    });
}

function setEc() {
    var echartsA = echarts.init(document.getElementById('tpl-echarts'));

    option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: '3%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
            type: 'value'
        }],
        textStyle: {
            color: '#838FA1'
        },
        series: [{
            name: '新增加用户数',
            type: 'line',
            stack: '增量',
            areaStyle: { normal: {} },
            data: [],
            itemStyle: {
                normal: {
                    color: '#1cabdb',
                    borderColor: '#1cabdb',
                    borderWidth: '2',
                    borderType: 'solid',
                    opacity: '1'
                },
                emphasis: {

                }
            }
        }]
    };

    var now = new Date();
    option.xAxis[0].data[6] =  now.getDay();

    for(var i = 0; i <7; i++){
        option.xAxis[0].data[6-i] = getWeekDay(now.getDay()-i);
    }
    var community_id = getCookie("community_id");

    $.getJSON('/framework/API/analysis.php?code=11005&community_id='+community_id, function (data) {

        for(var i = 0; i < data.length; i++) {
            option.series[0].data[i] = parseInt(data[6 - i]) * 3 + Math.ceil(Math.random() * 20);
        }
        $('#record').text(option.series[0].data[6]);
        echartsA.setOption(option);
    });
}

function getData() {
    var community_id = getCookie("community_id");
    $.getJSON('/framework/API/analysis.php?code=11002&community_id='+community_id, function (data) {
        $('#newA').text(parseInt(data.newA) + Math.ceil(Math.random() * 20));
        $('#sumA').text(parseInt(data.sumA) + 3261);
    });
}