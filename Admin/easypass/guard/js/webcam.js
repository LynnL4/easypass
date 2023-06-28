var n = null;
var v = null;
var gCtx = null;
var start = null;
var end = null;
var time = null;

$(function() {
	isLogin();
});
function isLogin() {
	var guard_id = getCookie("guard_id");
	if(!guard_id){
		window.location.href = "login.html";
	}
}

function captureToCanvas(){
	$('#toast').modal('close');
        start = new Date().getTime();

	document.getElementById('loading').style.display = "inline";
	try{
		gCtx.drawImage(v,0,0);//在canvas元素中绘出video的某一帧
		try{
			qrcode.decode();//扫描二维码
			//console.log(qrcode.decode());//扫描成功输出二维码的信息
			document.getElementById('loading').style.display = "none";//隐藏掉加载动画
			setTimeout(captureToCanvas, 4000);
		}
		catch(e){
			//console.log(e);//未扫描出二维码，输出错误信息
			setTimeout(captureToCanvas, 50);//200ms之后再重绘canvas
			document.getElementById('loading').style.display = "block";
		}
	}
	catch(e){
		//console.log(e);//若失败，输出错误信息
		setTimeout(captureToCanvas, 50);//500ms再重绘canvas
	}
}


//初始化canvas元素，形成一个矩形框
function initCanvas(w,h){
	n = navigator;
	v = document.getElementById("v");
	var gCanvas = document.getElementById("qr-canvas");
	gCanvas.style.width = w + "px";
	gCanvas.style.height = h + "px";
	gCanvas.width = w; gCanvas.height = h;
	gCtx = gCanvas.getContext("2d");
	gCtx.clearRect(0, 0, w, h);
}
function setwebcam(){
	var options = true;
	if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
	{
		try{
			navigator.mediaDevices.enumerateDevices().then(function(devices) {
				devices.forEach(function(device) {
					if (device.kind === 'videoinput') {
						if(device.label.toLowerCase().search("back") >-1)
							options={'deviceId': {'exact':device.deviceId}, 'facingMode':'environment'};
					}
					console.log(device.kind + ": " + device.label +" id = " + device.deviceId);
				});
				setwebcam2(options);
			});
		}
		catch(e)
		{
			console.log(e);
		}
	}
	else
	{
		console.log("no navigator.mediaDevices.enumerateDevices" );
	}
}
function setwebcam2(options){
	var p = n.mediaDevices.getUserMedia({video: options, audio: false});
	p.then(success, error);
	//  setTimeout(captureToCanvas, 500);
}
function success(stream){
	v.srcObject = stream;
	captureToCanvas();
}

function error(error){
	console.log(error);
}

function load(){
	initCanvas(800,600);
	qrcode.callback = read;
	setwebcam();
}
function read(a){
     
       	var community_id = getCookie("community_id");
	var guard_id = getCookie("guard_id");
	var auth_id = a.split('&')[0];
	var dynamic_code = a.split('&')[1];

	$.ajaxSettings.async = true;
	$.post('/guard/php/guard.php?code=10143',{
		dynamic_code:dynamic_code,
		auth_id: auth_id,
		guard_id: guard_id,
		community_id: community_id
	}, function (data) {
                end = new Date().getTime();
                time = "time: "+ (end-start) + " ms"
                console.log(time);
		var $content = $('#toast-content');
		//console.log(data);
		var res = parseInt(data);
		switch (res) {
			case 0:
				$content.html("解锁成功");
				break;
			case -1:
				$content.html("解锁失败");
				break;
			case -2:
				$content.html("二维码失效");
				break;
			case -3:
				$content.html("门禁卡错误，请核对小区");
				break;
			case -4:
				$content.html("次数失效");
				break;
			case -5:
				$content.html("不在允许进入的时间内");
				break;
			case -6:
				$content.html("解锁失败");
				break;
		}
		$('#toast').modal('open');

	});

}

function sleep(delay) {
	var start = (new Date()).getTime();
	while ((new Date()).getTime() - start < delay) {
		continue;
	}
}