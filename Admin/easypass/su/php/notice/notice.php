<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/2/28
 * Time: 15:29
 */

header("Content-Type:text/html;charset=utf-8");
require '../../../framework/library/MySQLPDO.class.php';
require '../../../framework/function.php';
require 'notice.class.php';

$object = new \su\notice();

$code = $_REQUEST["code"]; //操作代码

switch ($code){
    case 10220:
        $data = $object->getList(-1,-1);   //获取全局列表
        break;
    case 10224:
        $data = $object->getLastList(-1,-1);   //获取最新6条全局列表
        break;
    case 10223:
        $id = $_REQUEST["id"];
        $data = $object->deleteData($id);
        break;
    case 10225:
        $key = $_REQUEST["key"];
        $data = $object->search(-1,-1, $key);   //获取最新6条全局列表
        break;
    case 10201:
        $id = $_REQUEST["id"];
        $data = $object->getDetailByID($id);
        break;
    case 10222:
        $title = $_POST['title'];
        $account_id = $_POST['account_id'];
        $content = $_POST['content'];
        $area_id = $_POST['area_id'];
        $community_id = $_POST['community_id'];
        date_default_timezone_set('PRC');
        $create_time = date("Y-m-d H:i:s");
        $data = $object->addData($title,$content,$area_id,$community_id,$account_id,$create_time);
        break;
}


echo json_encode($data);