<?php
class Framework{
    //启动项目
    public static function run(){
        self::_init();              //初始化
        self::_registerAutoLoad();  //注册自动加载
        self::_extend();            //扩展功能
        self::_dispatch();          //请求分发
    }
    //初始化
    private static function _init(){
        //设置常量供项目使用
        define('DS',DIRECTORY_SEPARATOR);
        define('ROOT',dirname(dirname(__FILE__)).DS);
        define('APP_PATH',ROOT.'app'.DS);
        define('FRAMEWORK_PATH',ROOT.'framework'.DS);
        define('LIBRARY_PATH',FRAMEWORK_PATH.'library'.DS);
        define('COMMON_PATH',APP_PATH.'common'.DS);
        //获取p,c,a参数
       /* list($p,$c,$a) = self::_getParams();
        define('PLATFORM',strtolower($p));
        define('CONTROLLER',strtolower($c));
        define('ACTION',strtolower($a));
        //拼接平台、控制器、模型、视图路径
        define('PLATFORM_PATH',APP_PATH.PLATFORM.DS);
        define('CONTROLLER_PATH',PLATFORM_PATH.'controller'.DS);
        define('MODEL_PATH',PLATFORM_PATH.'model'.DS);
        define('VIEW_PATH',PLATFORM_PATH.'view'.DS);
        //视图路径
        define('COMMON_VIEW',VIEW_PATH.'common'.DS);
        define('CONTROLLER_VIEW',VIEW_PATH.CONTROLLER.DS);
        define('ACTION_VIEW',CONTROLLER_VIEW.ACTION.'.html');*/
        require FRAMEWORK_PATH.'function.php';
    }
    private static function _registerAutoLoad()
    {
        spl_autoload_register(function ($class_name) {
            $class_name = ucwords($class_name);
            if(strpos($class_name,'Controller')){
                $target = CONTROLLER_PATH."$class_name.class.php";
            }elseif(strpos($class_name,'Model')){
                $target = MODEL_PATH."$class_name.class.php";
            }else{
                $target = LIBRARY_PATH."$class_name.class.php";
            }
            require $target;
        });
    }
    private static function _extend(){
        //设置HttpOnly
        C('PHPSESSID_HTTPONLY')&& ini_set('session.cookie_httponly',1);
        //启动session
        isset($_SESSION) || session_start();
        //生成CSRF令牌
        define('TOKEN',token_get());
        //检测POST提交
        define('IS_POST',$_SERVER['REQUEST_METHOD']=='POST');
    }
    //请求分发
    private static function _dispatch(){
        $c = CONTROLLER.'Controller';
        $a = ACTION.'Action';
        //实现请求分发
        $Controller = new $c(); //实例化控制器
        $Controller->$a();      //调用操作
    }
    //获取请求参数
    private static function _getParama(){
        //获取URL参数
        $p = isset($_POST['p']) ? $_POST['p'] : 'home';
        $c = isset($_POST['c']) ? $_POST['c'] : 'index';
        $a = isset($_POST['a']) ? $_POST['a'] : 'index';
        return [$p,$c,$a];
    }

}