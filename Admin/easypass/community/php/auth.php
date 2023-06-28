<?php
/**
 * Created by PhpStorm.
 * User: lht85
 * Date: 2019/3/8
 * Time: 16:47
 */
header("Content-Type:text/html;charset=utf-8");
require '../../framework/library/MySQLPDO.class.php';
require '../../framework/function.php';
require 'auth.class.php';

$object = new \community\auth();

$code = $_REQUEST["code"]; //操作代码

switch ($code) {
    case 10160:
        $state =  $_REQUEST["state"];
        $community_id = $_REQUEST["community_id"];
        $data = $object->getList($community_id,$state);
        break;
    case 10161:
        $proprietor_id = $_REQUEST["proprietor_id"];
        $data = $object->auth($proprietor_id);
        break;
    case 10162:
        $proprietor_id = $_REQUEST["proprietor_id"];
        $data = $object->deleteData($proprietor_id);
        break;
    case 10163:
        $key =  $_REQUEST["key"];
        $community_id = $_REQUEST["community_id"];
        $data = $object->search($community_id,$key);
        break;

}


echo json_encode($data);