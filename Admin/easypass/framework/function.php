<?php
//遇到致命错误，输出错误信息并停止运行
function E($msg, $debug=''){
    $msg .=APP_DEBUG ? $debug : '';
    exit('<pre>'.htmlspecialchars($msg).'</pre>');
}
//调用配置信息
function C($name){
    static $config = null;  //保存项目中的设置
    if(!$config){   //函数首次被调用时载入配置文件
        $config = require dirname(dirname(__FILE__)) . '/framework/DatabaseConfig.php';
    }
    return isset($config[$name]) ? $config[$name] : '';
}
//接收变量（参数依次为变量名、接收方法、数据类型、默认值）
function I($var, $method='post', $type='html',$def=''){
    switch ($method){
        case 'get': $method =$_GET; break;
        case 'post': $method =$_POST; break;
    }
    $value = isset($method[$var]) ? $method[$var]:$def;
    switch($type){
        case 'string':
            $value = is_string($value) ? $value : '';
            break;
        case 'html':
            $value = is_string($value) ? toHTML($value):'';
            break;
        case 'int':
            $value =(int)$value;break;
        case 'id':
            $value = max((int)$value,0);break;
        case 'page':
            $value = max((int)$value,1);break;
        case 'float':
            $value = (float)$value;break;
        case 'bool':
            $value = (bool)$value;break;
        case 'array':
            $value = is_array($value) ? $value:[];break;
    }
    return $value;
}
//将HTML类型变量转换为string
function toHTML($str){
    $str = trim(htmlspecialchars($str,ENT_QUOTES));
    return str_replace(' ','&nbsp',$str);
}
function redirect($url){
    header("Location:$url");    //  重定向到目标url地址
    exit;
}
function tips($msg=null){
    if(!$msg){
        return '';  //没有提示信息时直接返回空字符串
    }
    return $msg[0] ? "<div>$msg[1]</div>": "<div class=\"error\">$msg[1]</div>";
}
//删除文件
function del_file($file_path){
    if(is_file($file_path)){
        unlink($file_path);     //判断文件是否存在，存在时删除
    }
}
//实现密码加密
function password($password,$salt){
    return md5($password,$salt);
}
//实例化特定表的模型
function D($name){
    static $Model = [];
    $name = strtolower($name);
    if(!isset($Model[$name])){
        $class_name = ucwords($name).'Model';
        $Model[$name] = is_file(MODEL_PATH."$class_name.class.php") ?
            new $class_name($name) : new Model($name);
    }
    return $Model[$name];
}
//实例化空模型
function M(){
    static $Model = null;
    $Model || $Model = new Model();
    return $Model;
}

function session($name,$value='',$type='get'){
    switch ($type){
        case 'get':     //读取（默认）
            return isset($_SESSION[$name]) ? $_SESSION[$name] : '';
        case 'isset':   //判断是否存在
            return isset($_SESSION[$name]);
        case 'save':    //修改
            $_SESSION[$name] = $value;
            break;
        case 'unset':   //删除
            unset($_SESSION[$name]);
            break;
    }
}
