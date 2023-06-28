$(function() {
    isLogin();

    //     // 判断用户是否已有自己选择的模板风格
    //    if(storageLoad('SelcetColor')){
    //      $('body').attr('class',storageLoad('SelcetColor').Color)
    //    }else{
    //        storageSave(saveSelectColor);
    //        $('body').attr('class','theme-black')
    //    }

    autoLeftNav();
    $(window).resize(function() {
        autoLeftNav();
        console.log($(window).width())
    });

    //    if(storageLoad('SelcetColor')){

    //     }else{
    //       storageSave(saveSelectColor);
    //     }
});


// 风格切换

$('.tpl-skiner-toggle').on('click', function() {
    $('.tpl-skiner').toggleClass('active');
});

$('.tpl-skiner-content-bar').find('span').on('click', function() {
    $('body').attr('class', $(this).attr('data-color'))
    saveSelectColor.Color = $(this).attr('data-color');
    // 保存选择项
    storageSave(saveSelectColor);

});



// 侧边菜单开关

function autoLeftNav() {



    $('.tpl-header-switch-button').on('click', function() {
        if ($('.left-sidebar').is('.active')) {
            if ($(window).width() > 1024) {
                $('.tpl-content-wrapper').removeClass('active');
            }
            $('.left-sidebar').removeClass('active');
        } else {

            $('.left-sidebar').addClass('active');
            if ($(window).width() > 1024) {
                $('.tpl-content-wrapper').addClass('active');
            }
        }
    })

    if ($(window).width() < 1024) {
        $('.left-sidebar').addClass('active');
    } else {
        $('.left-sidebar').removeClass('active');
    }
}


// 侧边菜单
$('.sidebar-nav-sub-title').on('click', function() {
    $(this).siblings('.sidebar-nav-sub').slideToggle(80)
        .end()
        .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
});


// cookie相关
function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";path=/";
}

function clearCookie(c_name) {
    setCookie(c_name, "", -1);
}

function isLogin() {
    var href = window.location.href.split('guard/')[1];
    if(href != "login.html" ){
            var account_id = getCookie("account_id");
            var community_id = getCookie("community_id");
            var role_id = getCookie("role_id");
            if(!account_id || !community_id || role_id != 3){
                window.location.href='login.html';

        }
    }else {

    }
}

function quit() {
    clearCookie("account_id");
    clearCookie("community_id");
    clearCookie("area_id");
    clearCookie("role_id");
    window.location.href='login.html';
}

function setSelfInfo() {
    var account_id = getCookie("account_id");
    $.getJSON('/community/php/selfInfo.php?code=11100&account_id='+account_id, function (data) {
        $("#user-name").text(data[0].user_name);
        $("#avaurl").html("<image src = '"+ data[0].avaurl +"'alt='" +data[0].user_name+ "' />");
        $("#community-name").html(data[0].community_name+'<br/>');
    });
}
